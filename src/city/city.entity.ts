import { User } from "src/user/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'cities'})
export class City{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:120, nullable: false, unique: true})
    name: string;

    @OneToMany(type => User, user => user.city)
    users: User[];
}