import { PartialType } from "@nestjs/mapped-types";
import { CreateItemDto } from "./create-item.dto";
import { IsOptional } from "class-validator";

export class UpdateItemDto extends PartialType(CreateItemDto){
    @IsOptional()
    userId: number
}
