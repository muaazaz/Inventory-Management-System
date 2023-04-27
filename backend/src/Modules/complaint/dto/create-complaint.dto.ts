import { IsArray, IsOptional, IsString } from "class-validator"

export class CreateComplaintDto {

    @IsString()
    title: string

    @IsString()
    description: string

    @IsOptional()
    photos: Array<any>
}
