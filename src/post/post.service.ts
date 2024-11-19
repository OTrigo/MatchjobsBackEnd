import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { postDto } from './dto';
import { jobDto, selectJobDto } from 'src/job/dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getMyPaginatedPosts(page: number, id: string) {
    const total = await this.prisma.post.count({
      where: {
        userId: id,
      },
    });
    const posts = await this.prisma.post.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        userId: true,
        user: true,
        analyticsId: true,
        videoUrl: true,
      },
      skip: (page - 1) * 10,
      take: 10,
    });
    return { posts, total };
  }

  async getPage(page: number) {
    const total = await this.prisma.post.count();
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        userId: true,
        user: true,
        analyticsId: true,
        analytic: true,
        videoUrl: true,
      },
      skip: (page - 1) * 10,
      take: 10,
    });
    return { posts, total };
  }

  async getAll() {
    return this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        userId: true,
        videoUrl: true,
        user: false,
        jobId: true,
        analyticsId: true,
        analytic: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        analytic: true,
      },
    });
    if (post) {
      await this.viewPost(String(post.analyticsId));
      return post;
    }
    throw new HttpException('POST NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async viewPost(id: string) {
    await this.prisma.analytic.update({
      where: {
        id: id,
      },
      data: {
        views: { increment: 1 },
      },
    });
  }

  async likePost(id: string) {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        analytic: {
          update: {
            likes: { increment: 1 },
          },
        },
      },
      include: {
        analytic: true,
      },
    });
  }

  async dislikePost(id: string) {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        analytic: {
          update: {
            likes: { decrement: 1 },
          },
        },
      },
      include: {
        analytic: true,
      },
    });
  }

  async getMyPosts(id: string) {
    const total = await this.prisma.post.count({
      where: {
        userId: id,
      },
    });
    const posts = await this.prisma.post.findMany({
      where: {
        userId: id,
      },
      include: {
        analytic: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { posts, total };
  }

  async createPost(dto: postDto, req: any) {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId: req.user.id,
        videoUrl: dto.videoUrl,
      },
    });
    const analytic = await this.prisma.analytic.create({
      data: {
        postId: post.id,
      },
    });
    await this.prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        analyticsId: analytic.id,
      },
    });
    if (dto.jobId) {
      const postWithJob = await this.prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          job: {
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

  async deletePost(id: string) {
    const post = await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  }

  async addJob(id: string, jobdto: selectJobDto) {
    const job = await this.prisma.job.findUnique({
      where: {
        id: jobdto.id,
      },
    });
    if (job) {
      const post = await this.prisma.post.update({
        where: {
          id: id,
        },
        data: {
          job: {
            connect: {
              id: jobdto.id,
            },
          },
        },
      });
      return post;
    }
    throw new HttpException('USER OR JOB NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async update(id: string, postdto: postDto) {
    const post = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: postdto.title,
        description: postdto.description,
        userId: postdto.userId,
        videoUrl: postdto.videoUrl,
        jobId: postdto.jobId,
      },
    });
    return post;
  }
}
