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
import { SelectCategoriesDto } from './dto/select-category.dto';
import { AllCategoryDto } from './dto/all-category.dto';
import { CategoryDetailDto } from './dto/category-details.dto';

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
  @Serialize(SelectCategoriesDto)
  @Roles(Role.Admin)
  @Get('select')
  findSelectOptions(@UserDecorator() user: any) {
    return this.categoryService.findSelectOptions(user);
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllCategoryDto)
  @Roles(Role.Admin, Role.Employee)
  @Get("findBy")
  findBySearch(@Query() query: any, @UserDecorator() user: any) {
    return this.categoryService.findBySearch(query.search, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllCategoryDto)
  @Roles(Role.Admin, Role.Employee)
  @Get()
  findAll(@UserDecorator() user: any) {
    return this.categoryService.findAll(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(CategoryDetailDto)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @UserDecorator() user: any) {
    return this.categoryService.update(+id, updateCategoryDto, user);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
