import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { jobDto } from './dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const jobs = await this.prisma.job.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        available: true,
        company: true,
        companyId: true,
        createdBy: true,
        application: true,
      },
    });
    return jobs;
  }

  async getJob(id: string) {
    return this.prisma.job.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createJob(req: any, dto: jobDto) {
    const job = await this.prisma.job.create({
      data: {
        title: dto.title,
        description: dto.description,
        companyId: dto.companyId,
        createdBy: req.user.id,
      },
    });
    return job;
  }

  async deleteJob(id: string) {
    const job = await this.prisma.job.delete({
      where: {
        id: id,
      },
    });
    return job;
  }

  async applyToJob(id: string, dto: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.id,
      },
    });
    if (user) {
      const job = await this.prisma.job.findUnique({ where: { id: id } });
      const application = await this.prisma.application.create({
        data: {
          userId: user.id,
          jobId: id,
          companyId: job?.companyId,
        },
      });
      return application;
    }
    throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
  }

  async getCompany(id: string) {
    const job = await this.prisma.job.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        available: true,
        company: true,
        companyId: true,
        application: true,
      },
      where: {
        companyId: id,
      },
    });
    return job;
  }

  async getCandidates(id: string) {
    const jobs = await this.prisma.job.findMany({
      select: {
        id: true,
        title: true,
        application: true,
      },
      where: {
        id: id,
      },
    });
    return jobs;
  }

  async update(id: string, jobdto: jobDto) {
    const job = await this.prisma.job.update({
      where: {
        id: id,
      },
      data: {
        title: jobdto.title,
        description: jobdto.description,
        companyId: jobdto.companyId,
      },
    });
    return job;
  }
}
