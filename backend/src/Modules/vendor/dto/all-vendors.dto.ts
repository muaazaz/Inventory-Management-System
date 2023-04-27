import { Expose, Transform } from "class-transformer";

export class AllVendorsDto{
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    contactNo: string

    @Transform(({obj})=>{
        const categoryNames = obj.categories?.map((category) => category.parent?.name) ?? [];
        const uniqueCategoryNames = [...new Set(categoryNames)];
        return uniqueCategoryNames.join(",");
    })
    @Expose()
    category: string

    @Transform(({obj})=>{
        const categoryNames = obj.categories?.map((category) => category.name) ?? [];
        const uniqueCategoryNames = [...new Set(categoryNames)];
        return uniqueCategoryNames.join(",");})
    @Expose()
    subCategory: string
}