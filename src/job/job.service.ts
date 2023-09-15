import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { jobDto } from './dto';

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

  async getJob(id: string) {
    return this.prisma.jobs.findUnique({
      where: {
        id: Number(id),
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

  async deleteJob(id: string) {
    const job = await this.prisma.jobs.delete({
      where: {
        id: Number(id),
      },
    });
    return job;
  }
}
