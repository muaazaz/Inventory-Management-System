import { Expose, Transform } from "class-transformer";
import { Item } from "src/Modules/item/entities/item.entity";
import { User } from "src/Modules/user/entities/user.entity";

export class AllRequestsDto{
    @Expose()
    id: number

    @Transform(({value})=>value?.name)
    @Expose()
    user: User

    @Transform(({value})=>value?.name)
    @Expose()
    item: Item

    @Transform(({obj})=>obj.item?.category?.parent?.name)
    @Expose()
    category: string

    @Transform(({obj})=>obj.item?.category?.name)
    @Expose()
    subCategory: string

    @Transform(({obj})=>obj.type === 'Faulty' ? obj.returnStatus : undefined)
    @Expose()
    returnType: string

    @Transform(({obj})=>(obj?.createdAt.toLocaleDateString()))
    @Expose()
    submission_date: string

    @Expose()
    status: string
}