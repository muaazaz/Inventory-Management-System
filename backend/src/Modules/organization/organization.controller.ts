import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllOrganizationsDto } from './dto/getAll-Organizations.dto';
import { OrganizationDetailsDTO } from './dto/organization-details.dto';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get('count')
  getCount(){
    return this.organizationService.getCount()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllOrganizationsDto)
  @Get()
  findAll(@Query() query:any) {
    return this.organizationService.findAll(query.search, query.select);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(OrganizationDetailsDTO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(+id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(OrganizationDetailsDTO)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}
