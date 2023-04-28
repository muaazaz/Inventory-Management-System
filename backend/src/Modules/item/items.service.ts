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
    @Inject(forwardRef(()=>CategoryService))
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

  findAll(user: any, type: string) {
    switch (type) {
      case "Acquire":
        return this.repo.find({
          relations: ['category', 'category.parent', 'category.organization'],
          where: { category: { organization: { id: user.organizationId } }, assigned_to: IsNull() },
          order: {
            id: "ASC"
          }
        });
      case "Faulty":
        return this.repo.find({
          relations: ['category', 'category.parent', 'category.organization'],
          where: { assigned_to: { id: user.id } },
          order: {
            id: "ASC"
          }
        });
      default:
        return this.repo.find({
          relations: ['category', 'category.parent', 'category.organization'], where: { category: { organization: { id: user.organizationId } } },
          order: {
            id: "ASC"
          }
        });
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
    return this.repo.remove(item);
  }

  async getCount(user: any) {
    const where = 'category1.organization = ' + user.organizationId

    const monthlyCount = await this.repo.createQueryBuilder('item')
      .select("COUNT(*) AS count, category2.name As category, item.assigned_to, TO_CHAR(TO_DATE(EXTRACT(MONTH FROM item.created_at ):: text, 'MM'),'Mon')AS month, EXTRACT(Month from item.created_at) AS monthNo")
      .innerJoin(Category, "category1", "category1.id = item.categoryId")
      .innerJoin(Category, "category2", "category2.id = category1.parentId")
      .where(where)
      .groupBy('item.assigned_to, category, month, monthNo')
      .orderBy('monthNo', 'ASC')
      .getRawMany()

    const currentMonthCount = await this.repo.createQueryBuilder('item')
      .select("COUNT(*) AS count")
      .innerJoin(Category, "category1", "category1.id = item.categoryId")
      .innerJoin(Category, "category2", "category2.id = category1.parentId")
      .where('EXTRACT(MONTH FROM item.created_at) = EXTRACT(MONTH FROM now())')
      .andWhere(where)
      .getRawOne()

    const totalCount = await this.repo.count({ relations: ['category', 'category.organization'], where: { category: { organization: { id: user.organizationId } } } })

    return { monthlyCount, currentMonthCount, totalCount }
  }

  async findBySearch(search: string, selectCategory: string, selectSubCategory: string, user: any) {
    if (!search && !selectCategory && !selectSubCategory) {
      return this.repo.find({
        relations: ['category', 'category.parent', 'category.organization'],
        where: { category: { organization: { id: user.organizationId } } },
        order: {
          id: "ASC"
        }
      });
    } else {
      const items = search ? await this.repo.createQueryBuilder('item')
        .leftJoinAndSelect('item.category', 'category')
        .leftJoinAndSelect('category.organization', 'organization')
        .leftJoinAndSelect('category.parent', 'parent')
        .where("LOWER(item.name) LIKE :search AND category.organizationId = :organization", { search: `%${search.toLowerCase()}%`, organization: user.organizationId })
        .orWhere("LOWER(organization.name) LIKE :search AND category.organizationId = :organization", { search: `%${search.toLowerCase()}%`, organization: user.organizationId })
        .orWhere("LOWER(parent.name) LIKE :search AND category.organizationId = :organization", { search: `%${search.toLowerCase()}%`, organization: user.organizationId })
        .orWhere("LOWER(category.name) LIKE :search AND category.organizationId = :organization", { search: `%${search.toLowerCase()}%`, organization: user.organizationId })
        .orderBy("item.id", "ASC")
        .getMany()
        :
        !selectSubCategory ?
          await this.repo.find({
            relations: ['category', 'category.organization', 'category.parent'],
            where: { category: { parent: { name: selectCategory }, organization: { id: user.organizationId } } },
            order: {
              id: "ASC"
            }
          })
          :
          await this.repo.find({
            relations: ['category', 'category.organization', 'category.parent'],
            where: { category: { name: selectSubCategory, organization: { id: user.organizationId } } },
            order: {
              id: "ASC"
            }
          })

      return items
    }
  }

  async setItemQuantityCount(subCategory: any) {
    const quantity = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id } } })
    const quantityAssigned = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id }, assigned_to: Not(IsNull()) } })
    const quantityUnassigned = await this.repo.count({ relations: ['category'], where: { category: { id: subCategory.id }, assigned_to: IsNull() } })
    const quantityFaulty = await this.repo.count({relations: ['category'], where:{category:{id: subCategory.id}, faulty: true}})

    subCategory.quantity = quantity
    subCategory.quantityAssigned = quantityAssigned
    subCategory.quantityUnassigned = quantityUnassigned
    subCategory.quantityFaulty = quantityFaulty

  }
}
