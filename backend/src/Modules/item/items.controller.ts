import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllItemsDto } from './dto/all-items.dto';
import { ItemDetailDto } from './dto/item-detail.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Roles(Role.Admin)
  @Get('count')
  getCount(@UserDecorator() user: any){
    return this.itemsService.getCount(user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllItemsDto)
  @Roles(Role.Admin, Role.Employee)
  @Get()
  findAll(@UserDecorator() user: any, @Query() query: any) {
    return this.itemsService.findAll(user, query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(ItemDetailDto)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(ItemDetailDto)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
