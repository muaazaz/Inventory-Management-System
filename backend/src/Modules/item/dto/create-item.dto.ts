import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateItemDto {
    @IsString()
    name: string

    @IsString()
    serialNo: string

    @IsString()
    description: string

    @IsPositive()
    @IsNumber()
    price: number

    @IsNumber()
    subCategoryId: number

    @IsNumber()
    vendorId: number

    @IsOptional()
    currentPrice: number

    @IsOptional()
    depriciatedPrice: number

    @IsOptional()
    depreciationPercentage: string
}
