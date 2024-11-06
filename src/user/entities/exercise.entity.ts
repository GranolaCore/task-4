import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    taskId: string;

    @Column()
    description: string;

    @Column('int')
    duration: number;

    @Column()
    date: string;

    @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'CASCADE' })
    user: User;
}
