import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from './entities/complaint.entity';
import { UserModule } from 'src/Modules/user/user.module';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [UserModule, PhotoModule, TypeOrmModule.forFeature([Complaint])],
  controllers: [ComplaintsController],
  providers: [ComplaintsService]
})
export class ComplaintsModule {}
