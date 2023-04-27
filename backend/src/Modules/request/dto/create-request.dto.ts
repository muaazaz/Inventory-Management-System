import { IsIn, IsNumber, IsString } from "class-validator"

export class CreateRequestDto {
    @IsString()
    itemName: string

    @IsString()
    @IsIn(['Acquire', 'Faulty'])
    type: string

    @IsString()
    description: string

    @IsNumber()
    itemId: number
}
