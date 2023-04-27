import { Category } from "src/Modules/category/entities/category.entity";
import { Item } from "src/Modules/item/entities/item.entity";
import { User } from "src/Modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    type: string

    @Column({default: 'Pending'})
    status: string

    @Column({default: '-'})
    returnStatus: string

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(()=>Item, (item)=>item.request)
    @JoinColumn()
    item: Item

    @ManyToOne(()=>User, (user)=>user.request)
    @JoinColumn()
    user: User
}
