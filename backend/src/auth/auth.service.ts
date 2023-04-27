import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}
    
    async verifyCredentials(email: string, password: string){
        const user = await this.repo.findOne({where: {email}, relations: {role: true, organization: true}})
        
        if(!user) throw new NotFoundException('Email is not registered')
    
        const validPass = await bcrypt.compare(password, user.password)    
        if(!validPass) throw new BadRequestException('Password incorrect')

        if(user.created_at.toString() === user.update_at.toString()){
            return {Message: "New user detected please set your account's password!", userId: user.id}
        }

        const token =   await this.genToken(user, user.role.role)

        return {user, token}
        
    }

    async genToken(user: User, role: string){
        return{
            access_token: this.jwtService.sign({
                email: user.email,
                name: user.name,
                id: user.id,
                role: role ,
                organizationId: user.organization?.id
            })
        }
    }
}