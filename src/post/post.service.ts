import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { postDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPosts() {
    return this.prisma.posts.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        userId: true,
        url: true,
        user: false,
      },
    });
  }

  async getPost(id: number) {
    return this.prisma.posts.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createPost(dto: postDto) {
    
    const post = await this.prisma.posts.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId: dto.userId,
        url : dto.url
      },
    });
    return post;
  }

  async deletePost(id: number) {
    const post = await this.prisma.posts.delete({
      where: {
        id: id,
      },
    });
    return post;
  }
}
