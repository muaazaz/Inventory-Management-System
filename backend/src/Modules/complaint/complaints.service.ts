import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/Modules/user/user.service';
import { Repository } from 'typeorm';
import { PhotoService } from '../photo/photo.service';
import { User } from '../user/entities/user.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { Complaint } from './entities/complaint.entity';

@Injectable()
export class ComplaintsService {
  constructor(@InjectRepository(Complaint)
  private repo: Repository<Complaint>,
    private userService: UserService,
    private photoService: PhotoService
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
    const where = logInUser.role === 'superadmin' ? {user: {role: {role: searchRole}}} : {user: {role: {role: searchRole}, organization: {id: logInUser.organizationId}}}


    switch (type) {
      case "own":
        const ownComplaints = await this.repo.find({
          relations: ['user'], where: { user: { id: logInUser.id } },
          order: {
            id: "ASC"
          }
        })
        return ownComplaints;
      default:
        const complaints = await this.repo.find({
          relations: ['user', 'user.role', 'user.organization', 'user.department'], where: where,
          order: {
            id: "ASC"
          }
        })
        return complaints;
    }


  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['user', 'user.photo', 'user.organization', 'user.organization.photo', 'photos'] });
  }

  async findBySearch(search: string, orgSelect: string, statusSelect: string, type: string, user: any) {
    const searchRole = user.role === 'superadmin' ? 2 : 3
    switch (type) {
      case 'own':
        if (!search && !statusSelect) {
          return this.repo.find({ where: { user: { id: user.id } }, relations: ['user'] })
        } else {
          const complaints = search ? await this.repo.createQueryBuilder('complaint')
            .leftJoinAndSelect('complaint.user', 'user')
            .where("LOWER(user.name) LIKE :search AND user.id = :id", { search: `%${search.toLowerCase()}%`, id: user.id })
            .where("LOWER(title) LIKE :search AND user.id = :id", { search: `%${search.toLowerCase()}%`, id: user.id })
            .orWhere("LOWER(description) LIKE :search AND user.id = :id", { search: `%${search.toLowerCase()}%`, id: user.id })
            .orderBy("complaint.id", "ASC")
            .getMany()
            :
            await this.repo.find({
              relations: ['user'],
              where:
                { status: statusSelect, user: { id: user.id } },
              order: {
                id: "ASC"
              }
            })
          return complaints
        }
      default:
        if (!search && !orgSelect && !statusSelect) {
          const where = user.role === 'superadmin' ? {user: {role: {id: searchRole}}} : {user: {role: {id: searchRole}, organization: {id: user.organizationId}}}
          return this.repo.find({ where: where, relations: ['user', 'user.organization', 'user.role', 'user.department'], order:{id: "ASC"} })
        } else {
          const queryWhere = user.role === 'superadmin' ? "" : `organization.id = ${user.organizationId}`
          
          const typeormWhere = user.role === 'superadmin' ? 
          {user: {role: {id: searchRole}}} : 
          {user: {role: {id: searchRole}, organization: {id: user.organizationId}}}

          const orgSelectWhere = user.role === 'superadmin' ? 
          {user: { role: { id: searchRole }, organization: { name: orgSelect }}} : 
          {user: {role: {id: searchRole}, organization: {id: user.organizationId, name: orgSelect }}}

          const complaints = search ? await this.repo.createQueryBuilder('complaint')
            .leftJoinAndSelect('complaint.user', 'user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.organization', 'organization')
            .leftJoinAndSelect('user.department', 'department')
            .where("LOWER(user.name) LIKE :search AND role.id = :searchRole", { search: `%${search.toLowerCase()}%`, searchRole })
            .orWhere("LOWER(description) LIKE :search AND role.id = :searchRole", { search: `%${search.toLowerCase()}%`, searchRole })
            .orWhere("LOWER(organization.name) LIKE :search AND role.id = :searchRole", { search: `%${search.toLowerCase()}%`, searchRole })
            .andWhere(queryWhere)
            .orderBy("complaint.id", "ASC")
            .execute()
            :
            orgSelect ?
              await this.repo.find({
                relations: ['user', 'user.role', 'user.organization'],
                where:
                  orgSelectWhere,
                  order: {id: "ASC"}
              })
              :
              await this.repo.find({
                relations: ['user', 'user.role', 'user.organization', 'user.department'],
                where:
                  {  ...typeormWhere, status: statusSelect },
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
    const roleId = user.role === 'superadmin' ? 2 : 3
    const where = user.role === 'superadmin' ? 'user.role = ' + roleId : 'user.role=' + roleId + ' AND user.organization = ' + user.organizationId

    const monthlyCount = await this.repo
      .createQueryBuilder('complaint')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from complaint.created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from complaint.created_at) AS monthNo")
      .addSelect(`COUNT(CASE WHEN complaint.status = 'Pending' THEN 1 ELSE NULL END)`, 'Pending')
      .addSelect(`COUNT(CASE WHEN complaint.status = 'Resolved' THEN 1 ELSE NULL END)`, 'Resolved')
      .innerJoin(User, 'user', 'user.id = complaint.userId')   
      .where(where) 
      .groupBy('month, monthNo')
      .orderBy(`monthNo`, 'ASC')
      .getRawMany();

    const currentMonthCount = await this.repo.createQueryBuilder('complaint')
      .select("status, count(*)")
      .innerJoin(User, "user", "user.id = complaint.userId")
      .where(where)
      .andWhere("EXTRACT(MONTH from complaint.created_at) = EXTRACT(MONTH from now())")
      .groupBy('status')
      .getRawMany()

    const totalPendingCount = await this.repo.count({ relations: { user: { role: true } }, where: { user: { role: { id: roleId } }, status: "Pending" } })
    const totalResolvedCount = await this.repo.count({ relations: { user: { role: true } }, where: { user: { role: { id: roleId } }, status: "Resolved" } })

    return { monthlyCount, currentMonthCount, totalPendingCount, totalResolvedCount }
  }
}
