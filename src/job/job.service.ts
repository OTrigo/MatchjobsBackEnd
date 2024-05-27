import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { jobDto } from './dto';
import { UserDto } from 'src/user/dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const jobs = await this.prisma.jobs.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        available: true,
        company: true,
        companyId: true,
      },
    });
    return jobs;
  }

  async getJob(id: number) {
    return this.prisma.jobs.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createJob(dto: jobDto) {
    const job = await this.prisma.jobs.create({
      data: {
        name: dto.name,
        description: dto.description,
        companyId: dto.companyId,
      },
    });
    return job;
  }

  async deleteJob(id: number) {
    const job = await this.prisma.jobs.delete({
      where: {
        id: id,
      },
    });
    return job;
  }

  async sendPortifolio(id: number, userdto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userdto.id,
      },
    });
    if (user) {
      const job = await this.prisma.jobs.update({
        where: {
          id: id,
        },
        data: {
          user: {
            connect: {
              id: user.id,
              email: user.email,
            },
          },
        },
      });
      return job;
    }
    throw new HttpException('USER OR JOB NOT FOUND', HttpStatus.NOT_FOUND);
  }
}
