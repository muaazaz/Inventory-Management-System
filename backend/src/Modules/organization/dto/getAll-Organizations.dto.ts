import { Expose, Transform } from "class-transformer"
import { Photo } from "src/Modules/photo/entities/photo.entity"

export class AllOrganizationsDto {
   
    @Expose()
    id: number
    
    @Expose()
    @Transform(({value})=> value ?  value.image : null)
    photo: Photo

    @Expose()
    name: string

    @Expose()
    @Transform(object=>(object?.obj?.city +","+ object.obj.country))
    location: string

    @Expose()
    email: string
    
    @Expose()
    representativeContactNo: string
}
