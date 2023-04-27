import { Expose, Transform } from "class-transformer";
import { Item } from "src/Modules/item/entities/item.entity";
import { User } from "src/Modules/user/entities/user.entity";

export class RequestDetailDto{
    @Expose()
    id: number

    @Transform(({obj})=>(obj?.createdAt.toLocaleDateString()))
    @Expose()
    submission_date: string

    @Expose()
    status: string

    @Expose()
    description: string

    @Transform(({value})=>value?.name)
    @Expose()
    item: Item

    @Transform(({obj})=>obj.item?.category?.parent?.name)
    @Expose()
    category: string

    @Transform(({obj})=>obj.item?.category?.name)
    @Expose()
    subCategory: string

    @Transform(({value})=>value? {
        photo: value.photo?.image,
        name: value.name,
        department: value.department?.name,
        email: value.email,
        contactNo: value.contactNo
    } : undefined)
    @Expose()
    user: User
}