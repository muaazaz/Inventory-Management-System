import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ItemsService } from '../item/items.service';

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
    const category = this.repo.create({ name: data.name, organizationId: loggedInUser.organizationId })
    await this.repo.save(category)

    if (data.subCategories) {
      data.subCategories.forEach(async (subCat) => {
        const subCategory = this.repo.create({ name: subCat.name, parent: category, organizationId: loggedInUser.organizationId })
        await this.repo.save(subCategory)
      })
    }
    await this.setCategoriesCount(loggedInUser)
    return category;
  }

  findSelectOptions(user: any) {
    return this.repo.find({
      relations: [ 'childern' ], where: { organization: { id: user.organizationId }, parent: IsNull() },
      order: {
        id: "ASC"
      }
    });
  }

  async findAll(search: string, user: any) {
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
    let [r1, r2] = await Promise.all([this.repo.save(category), this.setCategoriesCount(loggedInUser)])
    return r1
  }

  async remove(id: number, loggedInUser: any) {
    const category = await this.repo.findOne({ where: { id }, relations: { parent: true } })
    if (category.parent === null) {
      const categories = await this.repo.find({ relations: { parent: true }, where: [{ id }, { parent: { id } }] })
      return this.repo.remove(categories);
    }

    await this.setCategoriesCount(loggedInUser)
    return this.repo.remove(category)

  }

  async getCount(user: any) {
    const date = new Date()
    let currentMonthCount = 0
    let totalCount = 0

    const monthlyCount = await this.repo.createQueryBuilder('category')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from created_at) AS month_no, count(*) :: int")
      .where("category.organizationId = :organizationId", { organizationId: user.organizationId })
      .andWhere("category.parent IS NULL")
      .groupBy('month, month_no')
      .orderBy('month_no')
      .getRawMany()
    
    monthlyCount.forEach((element, i)=>{
      totalCount += element.count
      if(+element.month_no === (date.getMonth()+1)){
        currentMonthCount = element.count;
      }
    })

    return { monthlyCount, currentMonthCount, totalCount }
  }

//Function to calculate necessary counts
  async setCategoriesCount(user: any) {
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
  }

  async setSubCategoriesCount() {
    const subCategories = await this.repo.find({ where: { parent: Not(IsNull()) } })
    subCategories.forEach(async (subCategory) => {
      await this.itemService.setItemQuantityCount(subCategory)
      await this.repo.save(subCategory)
    })
  }
}
