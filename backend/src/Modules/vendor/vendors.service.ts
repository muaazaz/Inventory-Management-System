import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor) private repo: Repository<Vendor>,
    private categoryService: CategoryService,
  ) { }

  async create(data: CreateVendorDto) {
    const categories: Category[] = [];

    for (const id of data.categoriesId) {
      categories.push(await this.categoryService.findOne(id));
    }

    const vendor = this.repo.create({ ...data, categories });

    return this.repo.save(vendor);
  }

  async findAll(filters: any, logInUser: any) {
    if (!filters.search && !filters.selectCategory && !filters.selectSubCategory) {
      return this.repo.find({
        relations: ['categories', 'categories.parent', 'categories.organization'],
        where: { categories: { organization: { id: logInUser.organizationId } } },
        order: {
          id: "ASC"
        }
      });
    } else {
      const vendors = filters.search ? await this.repo.createQueryBuilder('vendor')
        .leftJoinAndSelect('vendor.categories', 'categories')
        .leftJoinAndSelect('categories.organization', 'organization')
        .leftJoinAndSelect('categories.parent', 'parent')
        .where("LOWER(vendor.name) LIKE :search AND categories.organizationId = :id", { search: `%${filters.search.toLowerCase()}%`, id: logInUser.organizationId })
        .orWhere("LOWER(categories.name) LIKE :search AND categories.organizationId = :id", { search: `%${filters.search.toLowerCase()}%`, id: logInUser.organizationId })
        .orWhere("LOWER(parent.name) LIKE :search AND categories.organizationId = :id", { search: `%${filters.search.toLowerCase()}%`, id: logInUser.organizationId })
        .orderBy("vendor.id", "ASC")
        .getMany()
        :
        !filters.selectSubCategory ?
          await this.repo.find({
            relations: ['categories', 'categories.organization', 'categories.parent'],
            where: { categories: { parent: { name: filters.selectCategory }, organization: { id: logInUser.organizationId } } },
            order: {
              id: "ASC"
            }
          })
          :
          await this.repo.find({
            relations: ['categories', 'categories.organization', 'categories.parent'],
            where: { categories: { name: filters.selectSubCategory, organization: { id: logInUser.organizationId } } },
            order: {
              id: "ASC"
            }
          })

      return vendors
    }
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['categories', 'categories.parent.organization'] });
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.repo.findOne({ where: { id }, relations: ['categories', 'categories.parent.organization'] })
    Object.assign(vendor, updateVendorDto)
    return this.repo.save(vendor);
  }

  async remove(id: number) {
    const vendor = await this.repo.findOneBy({ id });
    return this.repo.remove(vendor);
  }

  async getCount(user: any) {

    const totalCount = await this.repo.count({
      relations: ['categories', 'categories.organization'],
      where: { categories: { organization: { id: user.organizationId } } },
    });

    const currentMonthCount = await this.repo
      .createQueryBuilder("vendor")
      .innerJoin("vendor.categories", "category")
      .where('category.organizationId = :organizationId', {
        organizationId: user.organizationId,
      })
      .andWhere(
        'EXTRACT(MONTH from vendor.created_at) = EXTRACT(MONTH from now())',
      )
      .getCount();

    return { totalCount, currentMonthCount };
  }
}
