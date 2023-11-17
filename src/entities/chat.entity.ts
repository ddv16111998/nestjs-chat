import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    roomId: number;

    @Column()
    userId: number

    @Column({type: "text"})
    content: string

    @CreateDateColumn()
    createdAt: Date;
}