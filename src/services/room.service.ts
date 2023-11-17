import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';

enum ActionType {
    clickUser = 'click_user',
    clickRoom = 'click_room'
}

type Request1 = {
    userOne: number,
    userSecond: number
}
type Request2 = {
    id: number,
}
@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {}

    async getRoomByTwoUser(request: Request1): Promise<Room> | null {
        return this.roomRepository
            .createQueryBuilder('room')
            .where(`metaUsers->'userIds' @> '["${request.userOne}", "${request.userSecond}"]'`)
            .getOne();
    }

    async getRoomById(requestBody: Request2):Promise<Room> | null {
        return this.roomRepository
            .createQueryBuilder('room')
            .where({id: requestBody.id})
            .getOne();
    }

    // can get user_room setting by two user and id room
    async getUserRoomSettings(actionType: ActionType, request: Request1 | Request2, userId: number) {
        let room = null as Room;
        if (actionType === ActionType.clickUser){
            const requestSelected = request as Request1;
            room = await this.getRoomByTwoUser(requestSelected);
        }
        if (actionType === ActionType.clickRoom) {
            const requestSelected = request as Request2;
            room = await this.getRoomById(requestSelected);
        }
       return room?.metaUsers?.settings.filter((setting) => setting.userId === userId)
    }
}