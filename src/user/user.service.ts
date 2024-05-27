import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getPage(page: number) {
    const skip = page > 1 ? page * 10 : 0;
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
      skip: skip,
      take: 10,
    });
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
        email: dto.email,
        password: dto.password,
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
