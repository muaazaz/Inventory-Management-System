import { Expose, Transform } from "class-transformer";
import { Photo } from "src/Modules/photo/entities/photo.entity";

export class UsersDto {
    @Expose()
    id: number

    @Transform(({value})=>value? value.image : null)
    @Expose()
    photo: Photo

    @Expose()
    name: string

    @Transform(({obj})=>obj?.role?.role === 'superadmin' ? obj?.organization?.name : obj?.department?.name)
    @Expose()
    relation: string

    @Expose()
    email: string

    @Expose()
    contactNo: string
}
