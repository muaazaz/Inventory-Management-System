import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signIn-user.dto';
import { AuthService } from '../../auth/auth.service';
import { JwtAuthGuard } from 'src/guards/Jwt.auth.guard';
import { UserDecorator } from 'src/decorators/get-user-info.decorator';
import { OtpDto } from './dto/otp-user.dto';
import { FirstLoginDto } from './dto/first-login.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { Serialize } from 'src/decorators/serialize.decorator';
import { UsersDto } from './dto/users.dto';
import { UserDetailDto } from './dto/user.details.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  create(@Body() body: CreateUserDto, @UserDecorator() user: any) {
    return this.userService.create(body, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  signIn(@Body() body: SignInDto){
    return this.authService.verifyCredentials(body.email, body.password)
  }

  @Post('otp')
  generateOtp(@Body() body: OtpDto){
    return this.userService.genOtp(body.email)
  }

  @Patch('first/login/:id')
  setPassword(@Body() body: FirstLoginDto, @Param('id') id: string){
    return this.userService.firstLogin(+id, body.newPassword)
  }

  @Patch('password')
  updatePassword(@Body() body: OtpDto){
    return this.userService.verifyOtp(body.email, body.otp, body.newPassword)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get('count')
  getCounts(@UserDecorator()user: any){
    return this.userService.getCount(user)
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(UsersDto)
  @Get('findby')
  findBy(@Query() query:any, @UserDecorator() user:any){
    return this.userService.findBySearch(query.search, query.select, user)
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(UsersDto)
  @Get()
  findUsers(@UserDecorator() user: any) {
    return this.userService.findAll(user);
  }

  @Roles(Role.SuperAdmin, Role.Admin, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(UserDetailDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Roles(Role.SuperAdmin, Role.Admin, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Serialize(UserDetailDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @Roles(Role.SuperAdmin, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
