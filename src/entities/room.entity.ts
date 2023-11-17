import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

type MetaUsers = {
    userIds: number[],
    settings: Setting[]
}

type Setting = {
    userId: number,
    color: string,
    background: string
}
@Entity()
export class Room {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: "json", nullable: true})
    metaUsers: MetaUsers;

    @CreateDateColumn()
    createdAt: Date;
}