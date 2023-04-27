import { Category } from "src/Modules/category/entities/category.entity";
import { Item } from "src/Modules/item/entities/item.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    contactNo: string

    @CreateDateColumn({type: 'date'})
    created_at: Date

    @ManyToMany(()=> Category, (category)=>category.vendors,{
        cascade: true
    })
    @JoinTable()
    categories: Category[]

    @OneToMany(()=>Item, (item)=>item.vendor)
    items: Item
}
