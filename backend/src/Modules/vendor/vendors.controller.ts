import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllVendorsDto } from './dto/all-vendors.dto';
import { VendorDetailDto } from './dto/vendor-detail.dto';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get('count')
  getCount(@UserDecorator() user: any){
    return this.vendorsService.getCount(user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllVendorsDto)
  @Get('findby')
  findBy(@Query() query: any, @UserDecorator() user:any){
    return this.vendorsService.findBySearch(query.search, query.catSelect, query.subCatSelect, user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllVendorsDto)
  @Get()
  findAll(@UserDecorator() user: any) {
    return this.vendorsService.findAll(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(VendorDetailDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorsService.findOne(+id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(VendorDetailDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorsService.remove(+id);
  }
}
