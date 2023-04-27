import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { RoleService } from "./role.service";

@Controller('role')
export class RoleController{
    constructor(private roleService: RoleService){}
    @Post()
    create(@Body() body: CreateRoleDto){
        return this.roleService.create(body)
    }
}