import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./exercise.entity";

@Entity()
export class User {
    @Column()
    username: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Exercise, (exercise) => exercise.user)
    exercises: Exercise[];
}
