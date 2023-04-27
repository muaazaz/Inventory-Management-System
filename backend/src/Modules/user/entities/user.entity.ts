import { Exclude } from "class-transformer";
import { Complaint } from "src/Modules/complaint/entities/complaint.entity";
import { Department } from "src/Modules/department/entities/department.entity";
import { Item } from "src/Modules/item/entities/item.entity";
import { Organization } from "src/Modules/organization/entities/organization.entity";
import { Photo } from "src/Modules/photo/entities/photo.entity";
import { Request } from "src/Modules/request/entities/request.entity";
import { Role } from "src/Modules/role/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: 'Somone'})
    name: string

    @Column()
    email: string

    @Exclude()
    @Column()
    password: string

    @Column()
    contactNo: string

    @Exclude()
    @Column()
    privateEmail: string

    @Column({nullable: true})
    designation: string

    @Column({nullable: true})
    education: string

    @Column({nullable: true})
    companyExperience: string

    @Column({nullable: true})
    totalExperience: string

    @Exclude()
    @Column({nullable: true})
    otp: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

    @ManyToOne(()=> Role, (role)=>role.user)
    @JoinColumn()
    role: Role

    @ManyToOne(()=>Organization, (organization)=> organization.user)
    @JoinColumn()
    organization: Organization

    @OneToMany(()=>Complaint, (complaint)=>complaint.user,{cascade: true})
    complaint: Complaint

    @OneToMany(()=>Request, (request)=>request.user)
    request: Request

    @OneToMany(()=>Item, (item)=>item.assigned_to)
    item: Item

    @OneToOne(()=>Photo, (photo)=>photo.user)
    @JoinColumn()
    photo: Photo

    @ManyToOne(()=>Department, (department)=> department.user)
    @JoinColumn()
    department: Department

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase(){
        this.email = this.email.toLowerCase()
    }
}
