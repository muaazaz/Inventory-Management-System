import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { ItemsModule } from '../item/items.module';

@Module({
  imports: [UserModule, CategoryModule, ItemsModule, TypeOrmModule.forFeature([Request])],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
