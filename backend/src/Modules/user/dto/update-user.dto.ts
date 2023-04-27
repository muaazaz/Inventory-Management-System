import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto){
    @IsOptional()
    @IsString()
    designation: string

    @IsOptional()
    @IsString()
    education: string

    @IsOptional()
    @IsString()
    companyExperience: string

    @IsOptional()
    @IsString()
    totalExperience: string
}
