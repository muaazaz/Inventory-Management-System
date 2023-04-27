import { PartialType } from "@nestjs/mapped-types"
import { IsOptional } from "class-validator"
import { CreateRequestDto } from "./create-request.dto"

export class UpdateRequestDto extends PartialType(CreateRequestDto){

    @IsOptional()
    status: string

    @IsOptional()
    returnStatus: string
}
