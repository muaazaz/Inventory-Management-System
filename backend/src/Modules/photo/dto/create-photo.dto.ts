import { IsString } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    image: string
}
