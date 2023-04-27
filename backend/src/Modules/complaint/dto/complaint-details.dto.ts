import { Expose, Transform } from "class-transformer";
import { Photo } from "src/Modules/photo/entities/photo.entity";
import { User } from "src/Modules/user/entities/user.entity";

export class ComplaintDetailsDto {
    @Expose()
    id: number
    
    @Expose()
    description: string

    @Transform(({value})=>value)
    @Expose()
    created_at: Date

    @Expose()
    status: string

    @Expose()
    title: string

    @Transform(({value})=>value?.map((photo)=>(
        photo.image
    )))
    @Expose()
    photos: Photo[]

    @Transform(({value})=>value? {
        name: value.name,
        email: value.email,
        contactNo: value.contactNo,
        photo: value.photo? value.photo.image : null,
        orgName: value.organization.name,
        orgEmail: value.organization.email,
        orgPhoto: value.organization.photo? value.organization.photo.image : null
    } : null)
    @Expose()
    user: User
}