import { Expose, Transform } from "class-transformer";
import { User } from "src/Modules/user/entities/user.entity";
import { Vendor } from "src/Modules/vendor/entities/vendor.entity";
import { Item } from "../entities/item.entity";

export class ItemDetailDto {
    @Expose()
    name: string

    @Expose()
    serialNo: string

    @Expose()
    description: string

    @Transform(({ obj }) => obj.category?.parent?.name)
    @Expose()
    category: string

    @Transform(({ obj }) => obj.category?.name)
    @Expose()
    subCategory: string

    @Transform(({ obj }) => obj.created_at.toLocaleDateString())
    @Expose()
    dateOfPurchase: string

    @Expose()
    price: number

    @Expose()
    currentPrice: number

    @Expose()
    depriciatedPrice: number

    @Expose()
    depreciationPercentage: string

    @Transform(({ value }) => value ? {name: value.name, contactNo: value.contactNo} : null)
    @Expose()
    vendor: Vendor

    @Transform(({ value }) => value ? { 
        image: value.photo?.image, 
        name: value.name, 
        email: value.email, 
        contactNo: value.contactNo 
    } : null)
    @Expose()
    assigned_to: User

}