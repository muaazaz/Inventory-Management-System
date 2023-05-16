import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';
import { MultipleCreateDto } from './dto/create-multiple-photos.dto';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>){}
  create(createPhotoDto: CreatePhotoDto) {
    return this.repo.save(createPhotoDto);
  }

  // async createMultiple(photos: MultipleCreateDto){
  //   const multiPhotos = await this.repo.create(photos)
  //   return this.repo.save(multiPhotos)
  // }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({id});
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    const photo = await this.repo.findOneBy({id})
    return this.repo.save({...photo, ...updatePhotoDto});
  }

  remove(id: number) {
    return this.repo.delete({id});
  }

}
