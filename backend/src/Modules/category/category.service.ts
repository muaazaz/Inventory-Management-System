import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>, private userService: UserService) { }

  async create(data: CreateCategoryDto, loggedInUser: any) {
    const user = await this.userService.findOne(loggedInUser.id)
    const category = this.repo.create({ name: data.name, organization: user.organization })
    await this.repo.save(category)

    if (data.subCategories) {
      data.subCategories.forEach(async (subCat) => {
        const subCategory = this.repo.create({ name: subCat.name, parent: category, organization: user.organization })
        await this.repo.save(subCategory)
      })
    }
    return category;
  }

  findAll(user: any) {
    return this.repo.find({
      relations: ['parent', 'childern', 'organization'], where: { organization: { id: user.organizationId }, parent: IsNull() },
      order: {
        id: "ASC"
      }
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['childern', 'parent'] });
  }

  async update(id: number, updateData: UpdateCategoryDto) {
    const parentCategory = await this.repo.findOne({ where: { id } })
    const childCategory = this.repo.create({ name: updateData.name, parent: parentCategory })
    return this.repo.save(childCategory);
  }

  async remove(id: number) {
    const category = await this.repo.findOne({ where: { id }, relations: { parent: true } })
    if (category.parent === null) {
      const categories = await this.repo.find({ relations: { parent: true }, where: [{ id }, { parent: { id } }] })
      return this.repo.remove(categories);
    }
    return this.repo.remove(category)

  }

  async getCount(user: any) {
    const totalCount = await this.repo.count({ relations: { organization: true }, where: { parent: IsNull(), organization: { id: user.organizationId } } })

    const monthlyCount = await this.repo.createQueryBuilder('category')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from created_at) AS monthNo, count(*)")
      .where("category.organizationId = :organizationId", { organizationId: user.organizationId })
      .andWhere("category.parent IS NULL")
      .groupBy('month, monthNo')
      .orderBy('monthNo')
      .getRawMany()

    const currentMonthCount = await this.repo.createQueryBuilder('category')
      .select("COUNT(*) AS count")
      .where("category.organizationId = :organizationId", { organizationId: user.organizationId })
      .andWhere("EXTRACT(MONTH from created_at) = EXTRACT(MONTH from now())")
      .andWhere("category.parent IS NULL")
      .getRawOne()

    return { monthlyCount, currentMonthCount, totalCount }
  }
}
