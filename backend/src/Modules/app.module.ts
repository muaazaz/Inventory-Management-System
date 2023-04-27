import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { ComplaintsModule } from './complaint/complaints.module';
import { ItemsModule } from './item/items.module';
import { CategoryModule } from './category/category.module';
import { VendorsModule } from './vendor/vendors.module';
import { RequestModule } from './request/request.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    UserModule,
    RoleModule,
    OrganizationModule,
    ComplaintsModule,
    ItemsModule,
    CategoryModule,
    VendorsModule,
    RequestModule,
    DepartmentModule,
    PhotoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
