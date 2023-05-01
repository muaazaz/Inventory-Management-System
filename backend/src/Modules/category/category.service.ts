import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ItemsService } from '../item/items.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
    private userService: UserService,
    @Inject(forwardRef(() => ItemsService))
    private itemService: ItemsService
  ) { }

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

  findSelectOptions(user: any) {
    return this.repo.find({
      relations: ['parent', 'childern', 'organization'], where: { organization: { id: user.organizationId }, parent: IsNull() },
      order: {
        id: "ASC"
      }
    });
  }

  async findAll(user: any) {
    const categoriesCount = await this.repo.createQueryBuilder('category')
      .select('COUNT(vendors.id) AS vendors, COUNT(childern.id) AS childs, category.name, category.id')
      .leftJoin('category.organization', 'organization')
      .leftJoin('category.childern', 'childern')
      .leftJoin('childern.vendors', 'vendors')
      .where('category.parent Is Null AND organization.id = :id', { id: user.organizationId })
      .groupBy('category.name, category.id')
      .orderBy('category.id')
      .execute()

    await this.setSubCategoriesCount()

    for (const count of categoriesCount) {
      const category = await this.repo.findOneBy({ id: count.id })
      category.vendorsCount = count.vendors
      category.subCategoriesCount = count.childs
      await this.repo.save(category)
    }


    return this.repo.find({
      relations: ['parent', 'childern', 'organization', 'childern.vendors'], where: { organization: { id: user.organizationId }, parent: IsNull() },
      order: {
        id: "ASC",
        childern: { id: "ASC" }
      }
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['parent', 'vendors', 'childern'] });
  }

  async update(id: number, updateData: UpdateCategoryDto, loggedInUser: any) {
    const user = await this.userService.findOne(loggedInUser.id)
    const category = await this.repo.findOne({ where: { id } })

    if (updateData.subCategories) {
      for (const subCat of updateData.subCategories) {
        const subCategory = this.repo.create({ name: subCat.name, parent: category, organization: user.organization })
        await this.repo.save(subCategory)
      }
      return category;
    }

    Object.assign(category, updateData)
    return this.repo.save(category)
  }

  async remove(id: number) {
    const category = await this.repo.findOne({ where: { id }, relations: { parent: true } })
    if (category.parent === null) {
      const categories = await this.repo.find({ relations: { parent: true }, where: [{ id }, { parent: { id } }] })
      return this.repo.remove(categories);
    }
    return this.repo.remove(category)

  }

  async findBySearch(search: string, user: any) {
    if (!search) {
      return this.repo.find({
        relations: ['parent', 'childern', 'organization', 'childern.vendors'], where: { organization: { id: user.organizationId }, parent: IsNull() },
        order: {
          id: "ASC",
          childern: { id: "ASC" }
        }
      });
    } else {
      return this.repo.createQueryBuilder('category')
        .leftJoin('category.organization', 'organization')
        .leftJoinAndSelect('category.parent', 'parent')
        .leftJoinAndSelect('category.childern', 'childern')
        .leftJoinAndSelect('childern.vendors', 'vendors')
        .where("LOWER(category.name) LIKE :search AND organization.id = :orgId", { search: `%${search.toLowerCase()}%`, orgId: user.organizationId })
        .orderBy("category.id", "ASC")
        .addOrderBy("childern.id", "ASC")
        .getMany()
    }
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

  async setSubCategoriesCount() {
    const subCategories = await this.repo.find({ where: { parent: Not(IsNull()) } })
    subCategories.forEach(async (subCategory) => {
      await this.itemService.setItemQuantityCount(subCategory)
      await this.repo.save(subCategory)
    })
  }
}
