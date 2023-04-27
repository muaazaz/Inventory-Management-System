import { Expose, Transform } from "class-transformer"
import { IsEmpty } from "class-validator"
import { Photo } from "src/Modules/photo/entities/photo.entity"
import { User } from "src/Modules/user/entities/user.entity"

export class OrganizationDetailsDTO {

    @Expose()
    @Transform(( {value} ) => value?.image)
    photo: Photo

    @Expose()
    name: string

    @Expose()
    email: string

    @Expose()
    bio: string

    @Expose()
    @Transform(object => (
        object.obj.address + "," + 
        object.obj.city + "," + 
        object.obj.country + "," +
        object.obj.zip
        ))
    address: string

    @Expose()
    representativeName: string

    @Expose()
    representativeContactNo: string

    @Expose()
    @Transform(({value})=>value?.map((user)=>({
        id: user?.id,
        photo: user?.photo?.image,
        name: user?.name,
        organization: user?.organization?.name,
        email: user?.email,
        contactNo: user?.contactNo,
        role: user?.role?.role
    })))
    user: User
}
