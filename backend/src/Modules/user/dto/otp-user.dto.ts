import { IsEmail, IsOptional, IsString } from "class-validator";

export class OtpDto{
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    otp: string

    @IsOptional()
    @IsString()
    newPassword: string
}