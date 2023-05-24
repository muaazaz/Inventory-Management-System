import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/Modules/user/user.service';
import { Repository } from 'typeorm';
import { PhotoService } from '../photo/photo.service';
import { User } from '../user/entities/user.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Complaint } from './entities/complaint.entity';
import { RoleService } from '../role/role.service';

@Injectable()
export class ComplaintsService {
  constructor(@InjectRepository(Complaint)
  private repo: Repository<Complaint>,
    private userService: UserService,
    private photoService: PhotoService,
    private roleService: RoleService
  ) { }

  async create(createComplaintDto: CreateComplaintDto, logInUser: any) {
    try {
      const photos = []
      const user = await this.userService.findOne(logInUser.id)
      const complaint = this.repo.create({ ...createComplaintDto, user })
      if (createComplaintDto.photos) {
        for (const x of createComplaintDto.photos) {
          if (x.image) {
            photos.push(await this.photoService.create({ image: x.image }))
          }
        }
      }
      complaint.photos = photos
      return await this.repo.save(complaint);
    } catch (error) {
      return error.message
    }
  }

  async findAll(logInUser: any, type: string) {
    const searchRole = logInUser.role === 'superadmin' ? 'admin' : 'employee'
    const where = type === "own" ? 
    { user: { id: logInUser.id } }
    :
    logInUser.role === 'superadmin' ? {user: {role: {role: searchRole}}}
    : 
    {user: {role: {role: searchRole}, organization: {id: logInUser.organizationId}}}

    const relations = type === "own" ? 
    ['user']
    : 
    ['user', 'user.role', 'user.organization', 'user.department']

    return await this.repo.find({
      relations: relations, where: where,
        order: {
          id: "ASC"
        }
      })
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['user', 'user.photo', 'user.organization', 'user.organization.photo', 'photos'] });
  }

  async findBySearch(filters: any, user: any) {
    const searchRole = await this.roleService.getIdByRole(user.role) 
    switch (filters.type) {
      case 'own':
        if (!filters.search && !filters.statusSelect) {
          return this.repo.find({ where: { user: { id: user.id } }, relations: ['user'] })
        } else {
          const complaints = filters.search ? await this.repo.createQueryBuilder('complaint')
            .leftJoinAndSelect('complaint.user', 'user')
            .where("LOWER(user.name) LIKE :search AND user.id = :id", { search: `%${filters.search.toLowerCase()}%`, id: user.id })
            .where("LOWER(title) LIKE :search AND user.id = :id", { search: `%${filters.search.toLowerCase()}%`, id: user.id })
            .orWhere("LOWER(description) LIKE :search AND user.id = :id", { search: `%${filters.search.toLowerCase()}%`, id: user.id })
            .orderBy("complaint.id", "ASC")
            .getMany()
            :
            await this.repo.find({
              relations: ['user'],
              where:
                { status: filters.statusSelect, user: { id: user.id } },
              order: {
                id: "ASC"
              }
            })
          return complaints
        }
      default:
        if (!filters.search && !filters.orgSelect && !filters.statusSelect) {
          const where = user.role === 'superadmin' ? {user: {role: {id: searchRole}}} : {user: {role: {id: searchRole}, organization: {id: user.organizationId}}}
          return this.repo.find({ where: where, relations: ['user', 'user.organization', 'user.role', 'user.department'], order:{id: "ASC"} })
        } else {
          const queryWhere = user.role === 'superadmin' ? `user.role.id = ${searchRole}`
          : `user.role.id = ${searchRole} AND organization.id = ${user.organizationId}`
          
          const typeormWhere = user.role === 'superadmin' ? 
          {user: {role: {id: searchRole}}} : 
          {user: {role: {id: searchRole}, organization: {id: user.organizationId}}}

          const complaints = filters.search ? await this.repo.createQueryBuilder('complaint')
            .leftJoinAndSelect('complaint.user', 'user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.organization', 'organization')
            .leftJoinAndSelect('user.department', 'department')
            .where("LOWER(user.name) LIKE :search AND role.id = :searchRole", { search: `%${filters.search.toLowerCase()}%`, searchRole })
            .orWhere("LOWER(description) LIKE :search AND role.id = :searchRole", { search: `%${filters.search.toLowerCase()}%`, searchRole })
            .orWhere("LOWER(organization.name) LIKE :search AND role.id = :searchRole", { search: `%${filters.search.toLowerCase()}%`, searchRole })
            .andWhere(queryWhere)
            .orderBy("complaint.id", "ASC")
            .getMany()
            :
            filters.orgSelect ?
              await this.repo.find({
                relations: ['user', 'user.role', 'user.organization'],
                where:
                {user: { role: { id: searchRole }, organization: { name: filters.orgSelect }}},
                  order: {id: "ASC"}
              })
              :
              await this.repo.find({
                relations: ['user', 'user.role', 'user.organization', 'user.department'],
                where:
                  {  ...typeormWhere, status: filters.statusSelect },
                order:{id: "ASC"}
              })
          return complaints
        }
    }
  }

  async update(id: number) {
    const complaint = await this.repo.findOneBy({ id });
    complaint.status = 'Resolved'
    return this.repo.save(complaint);
  }

  async remove(id: number) {
    const complaint = await this.repo.findOneBy({ id });
    return this.repo.remove(complaint);
  }

  async getCount(user: any) {
    const date  = new Date()
    let currentMonthCount = {}, 
    totalPendingCount = 0,
    totalResolvedCount = 0

    const roleId = await this.roleService.getIdByRole(user.role)
    const where = user.role === 'superadmin' ? 'user.role = ' + roleId : 'user.role=' + roleId + ' AND user.organization = ' + user.organizationId

    const monthlyCount = await this.repo
      .createQueryBuilder('complaint')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from complaint.created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from complaint.created_at) AS month_no")
      .addSelect(`COUNT(CASE WHEN complaint.status = 'Pending' THEN 1 ELSE NULL END) :: int`, 'Pending')
      .addSelect(`COUNT(CASE WHEN complaint.status = 'Resolved' THEN 1 ELSE NULL END) :: int`, 'Resolved')
      .innerJoin(User, 'user', 'user.id = complaint.userId')
      .where(where) 
      .groupBy('month, month_no')
      .orderBy(`month_no`, 'ASC')
      .getRawMany();

      monthlyCount.forEach((element)=>{
        totalPendingCount += element.Pending;
        totalResolvedCount += element.Resolved;
        if(+element.month_no === (date.getMonth()+1)){
          currentMonthCount = {Pending: element.Pending,Resolved: element.Resolved}
        } 
      })

    return { monthlyCount, currentMonthCount, totalPendingCount, totalResolvedCount }
  }
}
