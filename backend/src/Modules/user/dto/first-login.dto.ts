import { IsString } from "class-validator";

export class FirstLoginDto{
    @IsString()
    newPassword: string
}