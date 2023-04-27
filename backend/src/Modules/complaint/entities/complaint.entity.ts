import { Photo } from "src/Modules/photo/entities/photo.entity";
import { User } from "src/Modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Complaint {
    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    title: string

    @Column()
    description: string

    @Column({default: 'Pending'})
    status: string

    @CreateDateColumn({type: 'date'})
    created_at: Date

    @ManyToOne(()=> User, (user)=>user.complaint)
    @JoinColumn()
    user: User

    @OneToMany(()=>Photo, (photo)=>photo.complaint)
    photos: Photo[]
}
