import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllDepartmentsDto } from './dto/all-departments.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto, @UserDecorator() user: any) {
    return this.departmentService.create(createDepartmentDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllDepartmentsDto)
  @Get('findby')
  findBy(@Query() query: any, @UserDecorator() user:any){
    return this.departmentService.findBySearch(query.search, user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllDepartmentsDto)
  @Get()
  findAll(@UserDecorator() user: any) {
    return this.departmentService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
