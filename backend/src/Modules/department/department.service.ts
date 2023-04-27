import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationService } from '../organization/organization.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(Department)
  private repo: Repository<Department>,
    private orgService: OrganizationService
  ) { }

  async create(createDepartmentDto: CreateDepartmentDto, loggedInUser: any) {
    const organization = await this.orgService.findOne(loggedInUser.organizationId)
    const department = this.repo.create({ ...createDepartmentDto, organization })
    return this.repo.save(department);
  }

  findAll(loggedInUser: any) {
    return this.repo.find({
      relations: ['organization'], where: { organization: { id: loggedInUser.organizationId } },
      order: {
        id: "ASC"
      }
    });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.repo.findOneBy({ id })
    Object.assign(department, updateDepartmentDto)
    return this.repo.save(department);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
  async findBySearch(search: string, user: any) {
    const complaints = await this.repo.createQueryBuilder('department')
      .leftJoinAndSelect('department.organization', 'organization')
      .where("LOWER(department.name) LIKE :search", { search: `%${search.toLowerCase()}%` })
      .orWhere("LOWER(department.email) LIKE :search", { search: `%${search.toLowerCase()}%` })
      .andWhere("department.organization = :organization_id", { organization_id: user.organizationId })
      .getMany()

    return complaints
  }

}
