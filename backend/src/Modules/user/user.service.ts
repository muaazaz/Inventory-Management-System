import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { RoleService } from 'src/Modules/role/role.service';
import { AuthService } from '../../auth/auth.service';
import { OrganizationService } from 'src/Modules/organization/organization.service';
import { PhotoService } from '../photo/photo.service';
import { DepartmentService } from '../department/department.service';
const otpGenerator = require('otp-generator')
const sgMail = require('@sendgrid/mail')

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private repo: Repository<User>,
    private roleService: RoleService,
    private authService: AuthService,
    private orgService: OrganizationService,
    private photoService: PhotoService,
    private dprtService: DepartmentService
  ) { }

  async create(userData: CreateUserDto, logInUser: any) {
    try {
      const searchRole = logInUser.role === 'superadmin' ? 'admin' : 'employee'
      const role = await this.roleService.findOne(searchRole)

      const msg = {
        to: userData.privateEmail,
        from: process.env.EMAIL, // Use the email address or domain you verified above
        subject: 'Account Created',
        html: '<h1>Congratulations your account has been successfuly created</h1> <h2> Email: ' + userData.email + '</h2> <h3> Password: ' + userData.password + '</h3>',
      };

      await this.sendMail(msg)

      userData.password = await this.hashPassword(userData.password)

      const user = this.repo.create({ ...userData, role })

      if (userData.image) {
        const photo = await this.photoService.create({ image: userData.image })
        user.photo = photo
      }

      switch (logInUser.role) {
        case "superadmin":
          const adminOrg = await this.orgService.findOne(userData.organizationId)
          user.organization = adminOrg
          break;
        case "admin":
          const employeeOrg = await this.orgService.findOne(logInUser.organizationId)
          const department = await this.dprtService.findOne(userData.departmentId)
          user.organization = employeeOrg
          user.department = department
          break;

        default:
          break;
      }

      return this.repo.save(user);

    } catch (err) {
      if (err.code === '23505') throw new ConflictException('Email already registered')
      else return err
    }

  }

  async firstLogin(userId: number, newPassword: string) {
    const user = await this.repo.findOne({ relations: { role: true }, where: { id: userId } })
    user.password = await this.hashPassword(newPassword)

    const token = await this.authService.genToken(user, user.role.role)

    return { user: await this.repo.save(user), token }
  }

  async findAll(user: any) {
    const searchRole = user.role === 'superadmin' ? 'admin' : 'employee'
    const users = await this.repo.find({
      relations: ['organization', 'role', 'photo', 'department'], where: { role: { role: searchRole } },
      order: {
        id: "ASC"
      }
    })
    return users
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: [
      'role', 'organization', 'photo', 'department', 'organization.photo', 'item', 
      'request', 'request.user', 'request.item', 'request.item.category', 
      'request.item.category.parent', 'item.category', 'item.category.parent',
      'item.assigned_to', 'item.assigned_by'
    ]
    })
    if (!user) {
      throw new NotFoundException('user not found')
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOneBy({ email })
    return user
  }

  async update(id: number, updateData: UpdateUserDto) {
    const user = await this.findOne(id)

    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password)
    }
    if (updateData.image !== user.photo?.image && user.photo) {
      await this.photoService.update(user.photo.id, { image: updateData.image })
    } else if (!user.photo && updateData.image) {
      user.photo = await this.photoService.create({ image: updateData.image })
    }
    if (updateData.departmentId && updateData.departmentId !== user.department.id) {
      user.department = await this.dprtService.findOne(updateData.departmentId)
    }

    Object.assign(user, updateData)

    return this.repo.save(user)
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ relations: { complaint: true, photo: true }, where: { id } })
    user.complaint = null
    user.request = null
    await this.repo.save(user)
    await this.photoService.remove(user.photo?.id)
    return this.repo.remove(user);
  }

  async getCount(user: any) {
    const roleId = user.role === 'superadmin' ? 2 : 3
    const where = user.role === 'superadmin' ? 'user.role = ' + roleId : 'user.role=' + roleId + ' AND user.organization = ' + user.organizationId

    const monthlyCount = await this.repo.createQueryBuilder('user')
      .select("TO_CHAR(TO_DATE(EXTRACT(Month from user.created_at)::text, 'MM'), 'Mon') AS month, EXTRACT(Month from user.created_at) AS monthNo, count(*)")
      .where(where)
      .groupBy('month, monthNo')
      .orderBy('monthNo', 'ASC')
      .getRawMany();

    const currentMonthCount = await this.repo.createQueryBuilder('user')
      .select("COUNT(*)")
      .where("EXTRACT(MONTH from created_at) = EXTRACT(MONTH from now())")
      .andWhere(where)
      .getRawOne()

    const totalCount = await this.repo.count({ where: { role: { id: roleId } } })

    return { monthlyCount, currentMonthCount, totalCount };
  }
  async findBySearch(search: string, select: string, user: any) {
    const searchRole = user.role === 'superadmin' ? 2 : 3
    if (!search && !select) {
      return this.repo.find({ relations: ['organization', 'department', 'role', 'photo'], where: { role: { id: searchRole } } })
    } else {
      const users = search ? await this.repo.createQueryBuilder('user')
        .leftJoinAndSelect('user.organization', 'organization')
        .leftJoinAndSelect('user.department', 'department')
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.photo', 'photo')
        .where("LOWER(user.name) LIKE :search AND user.role = :role", { search: `%${search.toLowerCase()}%`, role: searchRole })
        .orWhere("LOWER(user.email) LIKE :search AND user.role = :role", { search: `%${search.toLowerCase()}%`, role: searchRole })
        .orWhere("LOWER(organization.name) LIKE :search AND user.role = :role", { search: `%${search.toLowerCase()}%`, role: searchRole })
        .orWhere("LOWER(department.name) LIKE :search AND user.role = :role", { search: `%${search.toLowerCase()}%`, role: searchRole })
        .getMany()
        :
        user.role === 'superadmin' ?
          await this.repo.find({
            relations: ['organization', 'department', 'role', 'photo'],
            where:
              { organization: { name: select }, role: { id: searchRole } }
          })
          :
          await this.repo.find({
            relations: ['department', 'role', 'photo'],
            where:
              { department: { name: select }, role: { id: searchRole } }
          })
      return users
    }
  }
  //Otp routes
  async genOtp(email: string) {
    const user = await this.findByEmail(email)

    if (!user) throw new NotFoundException('Email not registered')

    const otp = otpGenerator.generate(6, { specialChars: false, lowerCaseAlphabets: false })
    user.otp = otp


    const msg = {
      to: user.email,
      from: process.env.EMAIL, // Use the email address or domain you verified above
      subject: 'Forgot Password Otp',
      html: '<h1>Your forgot password request is bieng processed</h1> <h2> OTP: ' + otp + '</h2>',
    };

    await this.sendMail(msg)
    await this.repo.save(user)

    return {otp};
  }

  async verifyOtp(email: string, otp: string, newPassword: string) {
    const user = await this.findByEmail(email)
    if (user.otp === otp.toUpperCase()) {
      user.otp = null
      user.password = await this.hashPassword(newPassword)

      return await this.repo.save(user)
    }
    throw new BadRequestException('Otp is incorrect')
  }

  //Helper Functions
  async sendMail(message: any) {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
    await sgMail.send(message)
  }
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }
}
