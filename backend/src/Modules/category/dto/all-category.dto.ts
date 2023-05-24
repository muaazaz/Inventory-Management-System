import { Expose, Transform } from "class-transformer";

export class AllCategoryDto {
    @Expose()
    id: number

    @Expose()
    name: string

    @Transform(({ obj }) => {
        let count = 0;
        obj.childern?.forEach((child) => {
            count++
        })
        return count
    })
    @Expose()
    subCategoriesCount: number

    @Transform(({ obj }) => {
        let count = 0;
        obj.childern?.forEach((child)=>{
            count += child.vendors ? child.vendors.length : 0
        })
        return count
    })
    @Expose()
    vendorsCount: number

    @Transform(({ obj }) => obj.childern?.map((child) => {
        let quantity = 0,
            quantityAssigned = 0,
            quantityUnassigned = 0,
            quantityFaulty = 0

        const names = []
        child.vendors?.forEach((vendor) => {
            names.push(vendor.name);
        });
        const vendorNames = names.length !== 0 ? names.join(',') : 'No vendor found'

        child.item?.forEach((item) => {
            quantity++;
            item.faulty ? quantityFaulty++ : item.assigned_to ? quantityAssigned++ : quantityUnassigned++
        });

        return {
            id: child.id,
            name: child.name,
            vendorNames,
            quantity,
            quantityAssigned,
            quantityUnassigned,
            quantityFaulty
        }
    }))
    @Expose()
    subCategories: any
}