import { Inject, Injectable, UseGuards, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { IsNull, Not, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { UserService } from '../user/user.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { VendorsService } from '../vendor/vendors.service';

@UseGuards(JwtAuthGuard)
@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item)
  private repo: Repository<Item>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
    private userService: UserService,
    private vendorService: VendorsService
  ) { }

  async create(createItemDto: CreateItemDto) {
    const category = await this.categoryService.findOne(createItemDto.subCategoryId)
    const vendor = await this.vendorService.findOne(createItemDto.vendorId)
    const item = this.repo.create(createItemDto)
    item.category = category
    item.vendor = vendor
    return this.repo.save(item);
  }

  async findAll(user: any, filters: any) {
    const where =
      filters.type === "Acquire" ?
        { category: { organization: { id: user.organizationId } }, assigned_to: IsNull() }
        :
        filters.type === "Faulty" ?
          { assigned_to: { id: user.id } }
          :
          { category: { organization: { id: user.organizationId } } }

    if (!filters.search && !filters.selectCategory && !filters.selectSubCategory) {
      return this.repo.find({
        relations: ['category', 'category.parent', 'category.organization'],
        where: where,
        order: {
          id: "ASC"
        }
      });
    } else {
      const items = filters.search ? await this.repo.createQueryBuilder('item')
        .leftJoinAndSelect('item.category', 'category')
        .leftJoinAndSelect('category.organization', 'organization')
        .leftJoinAndSelect('category.parent', 'parent')
        .where("LOWER(item.name) LIKE :search AND category.organizationId = :organization", { search: `%${filters.search.toLowerCase()}%`, organization: user.organizationId })
        .orWhere("LOWER(organization.name) LIKE :search AND category.organizationId = :organization", { search: `%${filters.search.toLowerCase()}%`, organization: user.organizationId })
        .orWhere("LOWER(parent.name) LIKE :search AND category.organizationId = :organization", { search: `%${filters.search.toLowerCase()}%`, organization: user.organizationId })
        .orWhere("LOWER(category.name) LIKE :search AND category.organizationId = :organization", { search: `%${filters.search.toLowerCase()}%`, organization: user.organizationId })
        .orderBy("item.id", "ASC")
        .getMany()
        :
        !filters.selectSubCategory ?
          await this.repo.find({
            relations: ['category', 'category.organization', 'category.parent'],
            where: { category: { parent: { name: filters.selectCategory }, organization: { id: user.organizationId } } },
            order: {
              id: "ASC"
            }
          })
          :
          await this.repo.find({
            relations: ['category', 'category.organization', 'category.parent'],
            where: { category: { name: filters.selectSubCategory, organization: { id: user.organizationId } } },
            order: {
              id: "ASC"
            }
          })

      return items
    }
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['category', 'category.parent', 'vendor', 'assigned_to'] });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.repo.findOne({ where: { id } })
    if (updateItemDto.userId) {
      const user = await this.userService.findOne(updateItemDto.userId)
      item.assigned_to = user
    }
    if (updateItemDto.assignedById) {
      const user = await this.userService.findOne(updateItemDto.assignedById)
      item.assigned_by = user
    }
    Object.assign(item, updateItemDto)

    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.repo.findOne({ where: { id } })
    await this.repo.remove(item);
    return
  }

  async getCount(user: any) {
    let totalCount = 0
    const where = 'category.organization = ' + user.organizationId

    const monthlyCount = await this.repo.createQueryBuilder('item')
      .select("category.name As category")
      .addSelect(`COUNT(CASE WHEN item.assigned_to is not null THEN 1 ELSE NULL END)`, 'Assigned')
      .addSelect(`COUNT(CASE WHEN item.assigned_to is null THEN 1 ELSE NULL END)`, 'Unassigned')
      .innerJoin("item.category", "subCategory")
      .innerJoin("subCategory.parent", "category")
      .where(where)
      .groupBy('category.name')
      .orderBy('COUNT(item.assigned_to)', 'ASC')
      .getRawMany();

    const currentMonthCount = await this.repo.createQueryBuilder('item')
      .select("COUNT(*) AS count")
      .innerJoin(Category, "subCategory", "subCategory.id = item.categoryId")
      .innerJoin(Category, "category", "category.id = subCategory.parentId")
      .where('EXTRACT(MONTH FROM item.created_at) = EXTRACT(MONTH FROM now())')
      .andWhere(where)
      .getRawOne()

    monthlyCount.forEach((element) => {
      totalCount += +element.Assigned + +element.Unassigned
    })

    return { monthlyCount, currentMonthCount, totalCount }
  }

  //helper function
  async setItemQuantityCount(subCategory: any) {
    const quantity = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id } } })
    const quantityAssigned = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id }, assigned_to: Not(IsNull()) } })
    const quantityUnassigned = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id }, assigned_to: IsNull() } })
    const quantityFaulty = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id }, faulty: true } })

    subCategory.quantity = quantity
    subCategory.quantityAssigned = quantityAssigned
    subCategory.quantityUnassigned = quantityUnassigned
    subCategory.quantityFaulty = quantityFaulty

  }
}
