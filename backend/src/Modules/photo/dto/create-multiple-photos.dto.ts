import { IsArray } from "class-validator";

export class MultipleCreateDto {
    @IsArray()
    photos: Array<{image: string}>
}