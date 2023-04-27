import { Complaint } from "src/Modules/complaint/entities/complaint.entity";
import { Organization } from "src/Modules/organization/entities/organization.entity";
import { User } from "src/Modules/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: string

    @OneToOne(()=>User, (user)=>user.photo)
    user: User

    @OneToOne(()=>Organization, (orgganization)=>orgganization.photo)
    organization: Organization

    @ManyToOne(()=>Complaint, (complaint)=>complaint.photos)
    complaint: Complaint
}
