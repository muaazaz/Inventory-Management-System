import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllComplaintsDto } from './dto/all-complaints.dto';
import { ComplaintDetailsDto } from './dto/complaint-details.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Roles(Role.Admin, Role.Employee)
  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto, @UserDecorator() user: any) {
    return this.complaintsService.create(createComplaintDto, user);
  }

  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('count')
  getCount(@UserDecorator() user: any){
    return this.complaintsService.getCount(user)
  }

  @Roles(Role.Admin, Role.Employee, Role.SuperAdmin) 
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllComplaintsDto)
  @Get('search')
  findBy(@Query() query: any, @UserDecorator() user:any){
    return this.complaintsService.findBySearch(query, user)
  }

  @Roles(Role.Admin, Role.Employee, Role.SuperAdmin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllComplaintsDto)
  @Get()
  findAll(@UserDecorator() user: any, @Query() query: any) {
    return this.complaintsService.findAll(user, query.type);
  }

  @Roles(Role.Admin, Role.Employee, Role.SuperAdmin) 
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(ComplaintDetailsDto) 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(+id);
  }

  @Roles(Role.Admin, Role.Employee, Role.SuperAdmin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(ComplaintDetailsDto)   
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.complaintsService.update(+id);
  }

  @Roles(Role.Admin, Role.SuperAdmin, Role.Employee)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintsService.remove(+id);
  }
}
