import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { UserService } from '../user/user.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor) private repo: Repository<Vendor>,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  async create(data: CreateVendorDto) {
    const categories: Category[] = [];

    for (const id of data.categoriesId) {
      categories.push(await this.categoryService.findOne(id));
    }

    const vendor = this.repo.create({ ...data, categories });

    return this.repo.save(vendor);
  }

  async findAll(logInUser: any) {
      return this.repo.find({
        relations: ['categories', 'categories.parent.organization'],
        where: {
          categories: { organization: { id: logInUser.organizationId } },
        },
        order:{
          id: "ASC"
        }
      })
  }

  findOne(id: number) {
    return this.repo.findOne({where: {id}, relations: ['categories', 'categories.parent.organization']});
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.repo.findOne({where:{id}, relations: ['categories', 'categories.parent.organization']})
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

  async findBySearch(search: string, selectCategory: string, selectSubCategory: string, user: any) {
    if (!search && !selectCategory && !selectSubCategory) {
      return this.repo.find({
        relations: ['categories', 'categories.parent', 'categories.organization'],
        where: { categories: { organization: { id: user.organizationId } } },
        order: {
          id: "ASC"
        }
      });
    } else {
      const vendors = search ? await this.repo.createQueryBuilder('vendor')
        .leftJoinAndSelect('vendor.categories', 'categories')
        .leftJoinAndSelect('categories.organization', 'organization')
        .leftJoinAndSelect('categories.parent', 'parent')
        .where("LOWER(vendor.name) LIKE :search AND categories.organizationId = :id", { search: `%${search.toLowerCase()}%`, id: user.organizationId })
        .orWhere("LOWER(categories.name) LIKE :search AND categories.organizationId = :id", { search: `%${search.toLowerCase()}%`, id: user.organizationId })
        .orWhere("LOWER(parent.name) LIKE :search AND categories.organizationId = :id", { search: `%${search.toLowerCase()}%`, id: user.organizationId })
        .orderBy("vendor.id", "ASC")
        .getMany()
        :
        !selectSubCategory ?
          await this.repo.find({
            relations: ['categories', 'categories.organization', 'categories.parent'],
            where: { categories: { parent: { name: selectCategory }, organization: { id: user.organizationId } } },
            order: {
              id: "ASC"
            }
          })
          :
          await this.repo.find({
            relations: ['categories', 'categories.organization', 'categories.parent'],
            where: { categories: { name: selectSubCategory, organization: { id: user.organizationId } } },
            order: {
              id: "ASC"
            }
          })

      return vendors
    }
  }
}
