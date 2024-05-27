import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { postDto } from './dto';
import { jobDto } from 'src/job/dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPage(page: number) {
    const skip = page > 1 ? page * 10 : 0;
    return this.prisma.posts.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        userId: true,
        user: true,
      },
      skip: skip,
      take: 10,
    });
  }

  async getAll() {
    return this.prisma.posts.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        userId: true,
        videoUrl: true,
        user: false,
        jobsId: true
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
  async getMyPosts(id: number) {
    return this.prisma.posts.findMany({
      where: {
        userId: id,
      },
    });
  }

  async createPost(dto: postDto) {
    const post = await this.prisma.posts.create({
      data: {
        name: dto.name,
        description: dto.description,
        userId: dto.userId,
        videoUrl: dto.videoUrl,
      },
    });
    if (dto.jobId) {
      const postWithJob = await this.prisma.posts.update({
        where: {
          id: post.id,
        },
        data: {
          jobs: {
            connect: {
              id: dto.jobId,
            },
          },
        },
      });
      return postWithJob;
    }
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

  async addJob(id: number, jobdto: jobDto) {
    const job = await this.prisma.jobs.findUnique({
      where: {
        id: jobdto.id,
      },
    });
    if (job) {
      const post = await this.prisma.posts.update({
        where: {
          id: id,
        },
        data: {
          jobs: {
            connect: {
              id: job.id,
            },
          },
        },
      });
      return post;
    }
    throw new HttpException('USER OR JOB NOT FOUND', HttpStatus.NOT_FOUND);
  }
}
