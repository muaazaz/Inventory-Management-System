import { Expose, Transform } from "class-transformer";

export class AllCategoryDto{
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    subCategoriesCount: number

    @Expose()
    vendorsCount: number

    @Transform(({obj})=>obj.childern?.map((child)=>{
        const names = child.vendors?.map((vendor) => vendor.name) ?? [];
        const vendorNames = names.length !== 0 ? names.join(',') : 'No vendor found'
        return{
            id: child.id,
            name: child.name,
            vendorNames,
            quantity: child.quantity,
            quantityAssigned: child.quantityAssigned,
            quantityUnassigned: child.quantityUnassigned,
            quantityFaulty: child.quantityFaulty
        }
    }))
    @Expose()
    subCategories: any
}