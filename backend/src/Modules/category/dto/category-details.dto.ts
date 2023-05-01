import { Expose, Transform } from "class-transformer";
import { Category } from "../entities/category.entity";
import { Vendor } from "src/Modules/vendor/entities/vendor.entity";

export class CategoryDetailDto {
    @Transform(({value})=> value?.name)
    @Expose()
    parent: Category

    @Expose()
    name: string

    @Expose()
    quantity: number

    @Expose()
    quantityAssigned: number

    @Expose()
    quantityUnassigned: number

    @Expose()
    quantityFaulty: number

    @Transform(({value})=>value?.map((vendor)=>({
            vendorName: vendor.name,
            contactNo: vendor.contactNo
    })))
    @Expose()
    vendors: Vendor

    @Expose()
    childern: Category
}