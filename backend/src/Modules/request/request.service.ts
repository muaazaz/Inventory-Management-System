import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { ItemsService } from '../item/items.service';

@Injectable()
export class RequestService {
  constructor(@InjectRepository(Request)
  private repo: Repository<Request>,
    private userService: UserService,
    private itemService: ItemsService
  ) { }

  async create(createRequestDto: CreateRequestDto, loggedInUser: any) {
    const user = await this.userService.findOne(loggedInUser.id)
    const item = await this.itemService.findOne(createRequestDto.itemId)
    const request = this.repo.create({ ...createRequestDto, user, item })

    return this.repo.save(request);
  }

  async findAll(type: string, loggedInUser: any) {
    switch (type) {
      case 'request':
        const requests = loggedInUser.role === 'admin' ? await this.repo.find({
          relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
          where: { user: { organization: { id: loggedInUser.organizationId } }, type: 'Acquire' },
          order: {
            id: "ASC"
          }
        })
          :
          await this.repo.find({
            relations: ['user', 'item', 'item.category', 'item.category.parent'],
            where: { user: { id: loggedInUser.id } },
            order: {
              id: "ASC"
            }
          })
        return requests
      case 'return':
        const returns = await this.repo.find({
          relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
          where: { user: { organization: { id: loggedInUser.organizationId } }, type: 'Faulty' },
          order: {
            id: "ASC"
          }
        })
        return returns
      default:
        break;
    }
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['user', 'user.department', 'user.photo', 'item', 'item.category', 'item.category.parent'] });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto, user) {
    const request = await this.repo.findOne({ where: { id } })
    if (request.type === 'Acquire' && updateRequestDto.status === 'Approved'){
      const assigned_date = new Date().toLocaleDateString()
      await this.itemService.update(request.item.id, {assigned_date, userId: request.user.id, assignedById: user.id})
    }
    Object.assign(request, updateRequestDto)

    return this.repo.save(request);
  }

  async remove(id: number) {
    const request = await this.repo.findOne({ where: { id } })
    return this.repo.remove(request);
  }

  async findBySearch(search: string, selectType: string, selectStatus: string, type: string, loggedInUser: any) {
    switch (type) {
      case 'request':
        if (!search && !selectStatus) {
          const requests = await this.repo.find({
            relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
            where: { user: { organization: { id: loggedInUser.organizationId } }, type: 'Acquire' },
            order: {
              id: "ASC"
            }
          })
          return requests
        }else{
          const requests = search ? await this.repo.createQueryBuilder('request')
          .leftJoinAndSelect('request.item', 'item')
          .leftJoinAndSelect('request.user', 'user')
          .leftJoinAndSelect('item.category', 'category')
          .leftJoinAndSelect('user.organization', 'organization')
          .leftJoinAndSelect('category.parent', 'parent')
          .where("LOWER(user.name) LIKE :search AND user.organizationId = :id AND request.type = 'Acquire'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
          .orWhere("LOWER(item.name) LIKE :search AND user.organizationId = :id AND request.type = 'Acquire'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
          .orWhere("LOWER(parent.name) LIKE :search AND user.organizationId = :id AND request.type = 'Acquire'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
          .orWhere("LOWER(category.name) LIKE :search AND user.organizationId = :id AND request.type = 'Acquire'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
          .orderBy("request.id", "ASC")
          .getMany()
          :
          await this.repo.find({
            relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
            where: { user: {organization: {id: loggedInUser.organizationId}}, status: selectStatus, type: 'Acquire' },
              order: {
                id: "ASC"
              }
            })
          return requests
        }
      case 'return':
        if (!search && !selectType && !selectStatus) {
        const returns = await this.repo.find({
          relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
          where: { user: { organization: { id: loggedInUser.organizationId } }, type: 'Faulty' },
          order: {
            id: "ASC"
          }
        })
        return returns
      }else{
        const returns = search ? await this.repo.createQueryBuilder('request')
        .leftJoinAndSelect('request.item', 'item')
        .leftJoinAndSelect('request.user', 'user')
        .leftJoinAndSelect('user.organization', 'organization')
        .leftJoinAndSelect('item.category', 'category')
        .leftJoinAndSelect('category.parent', 'parent')
        .where("LOWER(user.name) LIKE :search AND user.organizationId = :id AND request.type = 'Faulty'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
        .orWhere("LOWER(item.name) LIKE :search AND user.organizationId = :id AND request.type = 'Faulty'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
        .orWhere("LOWER(parent.name) LIKE :search AND user.organizationId = :id AND request.type = 'Faulty'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
        .orWhere("LOWER(category.name) LIKE :search AND user.organizationId = :id AND request.type = 'Faulty'", { search: `%${search.toLowerCase()}%`, id: loggedInUser.organizationId })
        .orderBy("request.id", "ASC")
        .getMany()
        :
        selectStatus ?
        await this.repo.find({
            relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
            where: { user: { organization: { id: loggedInUser.organizationId } }, status: selectStatus, type: 'Faulty' },
            order: {
              id: "ASC"
            }
        })
        :
        await this.repo.find({
          relations: ['user', 'user.organization', 'item', 'item.category', 'item.category.parent'],
          where: { user: { organization: { id: loggedInUser.organizationId } }, returnStatus: selectType, type: 'Faulty' },
          order: {
            id: "ASC"
          }
      })
        return returns
      }
      default:
        break;
    }
  }
}
