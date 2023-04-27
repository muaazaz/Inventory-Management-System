import { Expose, Transform } from "class-transformer";
import { Department } from "src/Modules/department/entities/department.entity";
import { Item } from "src/Modules/item/entities/item.entity";
import { Organization } from "src/Modules/organization/entities/organization.entity";
import { Photo } from "src/Modules/photo/entities/photo.entity";
import { Request } from "src/Modules/request/entities/request.entity";

export class UserDetailDto{

    @Transform(({value})=>value ? value.image : null)
    @Expose()
    photo: Photo

    @Expose()
    name: string

    @Expose()
    email: string

    @Expose()
    contactNo: string

    @Transform(({value})=> value ? {
        id: value.id,
        photo:  value.photo?  value.photo.image : null,
        name:  value.name,
        representativeName:  value.representativeName,
        representativeContactNo:  value.representativeContactNo,
        email:  value.email,
        location:  value.address +" "+ value.city +" "+  value.country
    } : null )
    @Expose()
     organization:  Organization

    @Transform(({value})=>value?.name)
    @Expose()
    department: Department

    @Transform(({value})=>value ? value.map((item)=>(
        {
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category.parent.name,
            subCategory: item.category.name,
            price: item.price
        }
    ))
    :
    value
    )
    @Expose()
    item: Item

    @Transform(({value})=>value ? value.map((request)=>(
        {
            id: request.id,
            itemName: request.item.name,
            category: request.item.category.parent.name,
            subCategory: request.item.category.name,
            date: request.createdAt.toLocaleDateString(),
            status: request.status
        }
    ))
    :
    value
    )
    @Expose()
    request: Request

}