import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';
import { RoleModule } from 'src/Modules/role/role.module';
import { JwtStrategy } from 'src/auth/Jwt.strategy';
import { OrganizationModule } from 'src/Modules/organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from '../photo/photo.module';
import { DepartmentModule } from '../department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RoleModule,
    OrganizationModule,
    PhotoModule,
    DepartmentModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
