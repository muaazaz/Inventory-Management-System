import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { VendorsModule } from '../vendor/vendors.module';

@Module({
  imports: [ CategoryModule, UserModule, VendorsModule, TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService]
})
export class ItemsModule {}
