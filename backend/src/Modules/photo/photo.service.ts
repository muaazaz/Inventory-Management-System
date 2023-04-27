import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>){}
  create(createPhotoDto: CreatePhotoDto) {
    return this.repo.save(createPhotoDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({id});
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.repo.findOneBy({id})
    Object.assign(photo, updatePhotoDto)
    return this.repo.save(photo);
  }

  remove(id: number) {
    
    return this.repo.delete({id});
  }
}
