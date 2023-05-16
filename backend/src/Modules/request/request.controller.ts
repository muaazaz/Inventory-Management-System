import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AllRequestsDto } from './dto/all-requests.dto';
import { RequestDetailDto } from './dto/request-detail.dto';

@Roles(Role.Admin, Role.Employee)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto, @UserDecorator() user: any) {
    return this.requestService.create(createRequestDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(AllRequestsDto)
  @Get()
  findAll(@Query() query: any, @UserDecorator() user: any) {
    return this.requestService.findAll(query, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(RequestDetailDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto, @UserDecorator() user: any) {
    return this.requestService.update(+id, updateRequestDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
