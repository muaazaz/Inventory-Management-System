import { IsAlpha, IsArray, IsString } from "class-validator";

export class CreateVendorDto {
    
    @IsString()
    name: string

    @IsString()
    contactNo: string

    @IsArray()
    categoriesId: number[] 
}
