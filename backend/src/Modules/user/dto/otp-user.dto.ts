import { IsEmail, IsOptional, IsString } from "class-validator";

export class OtpDto{
    @IsEmail()
    email: string

    @IsOptional()
    otp: string

    @IsOptional()
    newPassword: string
}