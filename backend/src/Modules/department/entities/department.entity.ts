import { Organization } from "src/Modules/organization/entities/organization.entity";
import { User } from "src/Modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    contactNo: string

    @ManyToOne(()=>Organization, (organization)=>organization.department)
    @JoinColumn()
    organization: Organization

    @OneToMany(()=>User, (user)=>user.department)
    user: User
}
