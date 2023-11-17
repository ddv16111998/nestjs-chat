import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app/app.gateway';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Chat} from "./entities/chat.entity";
import {Room} from "./entities/room.entity";
import {User} from "./entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '12345678',
      database: 'chat-nestjs',
      entities: [Chat, Room, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Chat]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
