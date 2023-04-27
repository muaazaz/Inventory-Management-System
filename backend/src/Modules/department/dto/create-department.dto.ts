import { IsEmail, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    contactNo: string
}
