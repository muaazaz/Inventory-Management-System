import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dtos/create-role.dto";
import { Role } from "./entities/role.entity";

@Injectable()
export class RoleService{
    constructor(@InjectRepository(Role) private repo: Repository<Role>){}
    create(createRoleDto: CreateRoleDto){
        return this.repo.save(createRoleDto)
    }
    findOne(role: string){
        return this.repo.findOneBy({role})
    }
}