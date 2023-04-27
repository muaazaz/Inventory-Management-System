import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllCategoriesDto } from './dto/all-category.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @UserDecorator() user: any) {
    return this.categoryService.create(createCategoryDto, user);
  }

  @Roles(Role.Admin)
  @Get('count')
  getCount(@UserDecorator() user: any){
    return this.categoryService.getCount(user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllCategoriesDto)
  @Roles(Role.Admin, Role.Employee)
  @Get()
  findAll(@UserDecorator() user: any) {
    return this.categoryService.findAll(user);
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
