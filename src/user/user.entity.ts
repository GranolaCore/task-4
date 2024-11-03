import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @Column()
    username: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;
}
