import { User } from "src/Modules/user/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    role: string

    @OneToMany(()=> User, (user)=>user.role )
    user: User
}