import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UserModule } from '../user/user.module';
import { ItemsModule } from '../item/items.module';

@Module({
  imports: [UserModule, forwardRef(()=>ItemsModule), TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
