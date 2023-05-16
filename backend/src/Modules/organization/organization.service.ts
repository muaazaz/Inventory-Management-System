import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoService } from '../photo/photo.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(@InjectRepository(Organization)
  private repo: Repository<Organization>,
    private photoService: PhotoService
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.repo.create(createOrganizationDto)
    if (createOrganizationDto.image) {
      const photo = await this.photoService.create({ image: createOrganizationDto.image })
      organization.photo = photo
    }
    return this.repo.save(organization);
  }

  async findAll(search: string, select: string) {
    const selectSearch = select?.split(",")
    if (!search && !select) {
      return this.repo.find({ relations: { photo: true }, order:{id: "ASC"} })
    } else {
      const organizations = search ? await this.repo.createQueryBuilder('organization')
        .leftJoinAndSelect('organization.photo', 'photo')
        .where("LOWER(organization.name) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orWhere("LOWER(organization.email) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orWhere("LOWER(organization.city) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orWhere("LOWER(organization.country) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orderBy("organzation.id","ASC")
        .getMany()
        : await this.repo.find({
          relations: ['photo'],
          where: { city: selectSearch[0], country: selectSearch[1] },
          order:{
            id:"ASC"
          }
        })
      return organizations
    }
  }

  findOne(id: number) {
    return this.repo.findOne({ relations: ['user', 'photo', 'user.role', 'user.photo', 'user.organization'], where: { id } });
  }

  async update(id: number, updateData: UpdateOrganizationDto) {
    const organization = await this.repo.findOne({ relations: ['user', 'photo', 'user.role', 'user.photo', 'user.organization'], where: { id } })
    if (organization.photo?.image !== updateData.image && organization.photo) {
      await this.photoService.update(organization.photo.id, { image: updateData.image })
    } else if (updateData.image && !organization.photo) {
      organization.photo = await this.photoService.create({ image: updateData.image })
    }

    return this.repo.save({...organization, updateData});
  }

  async remove(id: number) {
    const organization = await this.repo.findOneBy({ id })
    organization.user = null
    await this.repo.save(organization)
    return this.repo.remove(organization);
  }

  async getCount() {
    const date = new Date()
    let currentMonthCount = 0,
    totalCount = 0

    const monthlyCount = await this.repo.createQueryBuilder('organization')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from created_at) AS monthNo, count(*) :: int")
      .groupBy('month, monthNo')
      .orderBy('monthNo', 'ASC')
      .getRawMany();
      
      monthlyCount.forEach((element)=>{
        totalCount += element.count;
        if(+element.month_no === (date.getMonth()+1)){
          currentMonthCount = element.count
        } 
      })

    return { monthlyCount, currentMonthCount, totalCount }
  }
}
