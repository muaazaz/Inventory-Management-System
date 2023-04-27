import { Expose, Transform } from "class-transformer";

export class AllItemsDto {
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    description: string

    @Transform(({obj})=>obj.category?.parent?.name)
    @Expose()
    category: string

    @Transform(({obj})=>obj.category?.name)
    @Expose()
    subCategory: string

    @Expose()
    price: number
}