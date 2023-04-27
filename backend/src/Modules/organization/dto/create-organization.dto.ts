import { IsEmail, IsOptional, IsString } from "class-validator"

export class CreateOrganizationDto {
    @IsString()
    name: string
    
    @IsString()
    @IsOptional()
    image: string

    @IsEmail()
    email: string

    @IsString()
    bio: string

    @IsString()
    address: string

    @IsString()
    country:string

    @IsString()
    city: string

    @IsString()
    zip: string

    @IsString()
    representativeName: string
    
    @IsString()
    representativeContactNo: string
}
