import { IsArray, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string

    @IsArray()
    subCategories: [{name: string}]
}
