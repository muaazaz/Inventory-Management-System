import { Exclude } from "class-transformer";
import { Category } from "src/Modules/category/entities/category.entity";
import { Department } from "src/Modules/department/entities/department.entity";
import { Photo } from "src/Modules/photo/entities/photo.entity";
import { User } from "src/Modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    bio: string

    @Column()
    address: string

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    zip: string

    @Column()
    representativeName: string

    @Column()
    representativeContactNo: string

    @CreateDateColumn()
    created_at: Date

    @OneToMany(()=>User, (user)=> user.organization,{cascade: true})
    user: User

    @OneToMany(()=>Category, (category)=> category.organization)
    category: Category

    @OneToOne(()=>Photo, (photo)=>photo.organization)
    @JoinColumn()
    photo: Photo

    @OneToMany(()=>Department, (department)=> department.organization)
    department: Department
}
