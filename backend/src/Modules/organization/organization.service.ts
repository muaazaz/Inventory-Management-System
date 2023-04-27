import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PhotoService } from '../photo/photo.service';
import { User } from '../user/entities/user.entity';
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

  findAll() {
    return this.repo.find({
      relations: ['photo'],
      order: {
        id: "ASC"
      }
    });
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
    Object.assign(organization, updateData)

    return this.repo.save(organization);
  }

  async remove(id: number) {
    const organization = await this.repo.findOneBy({ id })
    organization.user = null
    await this.repo.save(organization)
    return this.repo.remove(organization);
  }

  async getCount() {
    const monthlyCount = await this.repo.createQueryBuilder('organization')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from created_at) AS monthNo, count(*)")
      .groupBy('month, monthNo')
      .orderBy('monthNo', 'ASC')
      .getRawMany();

    const currentMonthCount = await this.repo.createQueryBuilder('organization')
      .select("COUNT(*) AS count")
      .where("EXTRACT(MONTH from created_at) = EXTRACT(MONTH from now())")
      .getRawOne()

    const totalCount = await this.repo.count()

    return { monthlyCount, currentMonthCount, totalCount }
  }

  async findBySearch(search: string, select: string) {
    const selectSearch = select?.split(",")
    if (!search && !select) {
      return this.repo.find({ relations: { photo: true } })
    } else {
      const organizations = search ? await this.repo.createQueryBuilder('organization')
        .leftJoinAndSelect('organization.photo', 'photo')
        .where("LOWER(organization.name) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orWhere("LOWER(organization.email) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orWhere("LOWER(organization.city) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .orWhere("LOWER(organization.country) LIKE :search", { search: `%${search.toLowerCase()}%` })
        .getMany()
        : await this.repo.find({
          relations: ['photo'],
          where: { city: selectSearch[0], country: selectSearch[1] }
        })
      return organizations
    }
  }
}
