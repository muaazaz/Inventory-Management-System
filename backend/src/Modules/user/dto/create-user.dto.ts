import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string

    @IsString()
    @IsOptional()
    image: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @IsEmail()
    privateEmail: string

    @IsString()
    @MinLength(8)
    password: string

    @IsString()
    @MinLength(10)
    contactNo: string

    @IsOptional()
    organizationId: number

    @IsOptional()
    departmentId: number
}
