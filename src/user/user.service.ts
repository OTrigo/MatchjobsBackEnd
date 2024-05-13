import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto, UserDto } from './dto';
import { compare, hash } from 'bcrypt';



@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: CreateUserDto) {
    const password = await hash(dto.password, 12);

    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (emailExists !== null) {
      
      throw new HttpException('E-mail already in use', HttpStatus.CONFLICT);
    }
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: password,
      },
    });
    return user;
  }

  async signIn(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      const match = await compare(dto.password, user.password);
      if (match) return user;
    }
    throw new HttpException('Wrong Email or Password', HttpStatus.UNAUTHORIZED);
    
  }

  async getAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
    });
  }

  async getUser(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
      },
    });
    return user;
  }

  async delete(id: number) {
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }
}
