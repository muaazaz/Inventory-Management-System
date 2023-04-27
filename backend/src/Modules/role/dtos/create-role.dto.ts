import { IsAlpha, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsAlpha()
    role: string
}