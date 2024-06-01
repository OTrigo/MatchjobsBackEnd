import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getPage(page: number) {
    const total = await this.prisma.user.count();
    const userpage = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
      skip: (page - 1) * 10,
      take: 10,
    });
    return { userpage, total };
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
    const password = await hash(dto.password, 12);
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: dto.email,
        password: password
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
