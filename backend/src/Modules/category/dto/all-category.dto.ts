import { Expose, Transform } from "class-transformer";
import { Category } from "../entities/category.entity";

export class AllCategoriesDto{
    @Expose()
    id: number

    @Expose()
    name: string

    @Transform(({value})=>value ? value.map((child)=> ({
        value: child.id,
        label: child.name
    }))  : null)
    @Expose()
    childern: Category
}