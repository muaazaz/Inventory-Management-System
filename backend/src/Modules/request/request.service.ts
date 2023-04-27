import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
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
            relations: ['item', 'item.category', 'item.category.parent'],
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

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const request = await this.repo.findOne({ where: { id } })
    Object.assign(request, updateRequestDto)

    return this.repo.save(request);
  }

  async remove(id: number) {
    const request = await this.repo.findOne({ where: { id } })
    return this.repo.remove(request);
  }
}
