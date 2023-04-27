import { PartialType } from "@nestjs/mapped-types"
import { IsIn, IsOptional, IsString } from "class-validator"
import { CreateRequestDto } from "./create-request.dto"

export class UpdateRequestDto extends PartialType(CreateRequestDto){

    @IsOptional()
    status: string

    @IsOptional()
    returnStatus: string

}
