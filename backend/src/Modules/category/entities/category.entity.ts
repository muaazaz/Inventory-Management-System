import { Item } from "src/Modules/item/entities/item.entity";
import { Organization } from "src/Modules/organization/entities/organization.entity";
import { Request } from "src/Modules/request/entities/request.entity";
import { Vendor } from "src/Modules/vendor/entities/vendor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    @Column({default: 0})
    subCategoriesCount: number

    @Column({default: 0})
    vendorsCount: number

    @Column({default: 0})
    quantity: number

    @Column({default: 0})
    quantityAssigned: number

    @Column({default: 0})
    quantityUnassigned: number

    @Column({default: 0})
    quantityFaulty: number

    @ManyToOne(()=> Category, (category)=>category.childern)
    @JoinColumn()
    parent: Category

    @OneToMany(()=> Category,(category)=> category.parent)
    @JoinColumn()
    childern: Category[]

    @OneToMany(()=>Item, (item)=>item.category)
    item: Item

    @ManyToOne(()=>Organization, (organization)=>organization.category)
    organization: Organization

    @Column()
    organizationId: number

    @ManyToMany(()=>Vendor, (vendor)=>vendor.categories)
    vendors: Vendor
}
