import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyDto } from './dto/';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.company.findMany({
      select: {
        id: true,
        name: true,
        employees: true,
        job: true,
        rating: true,
        sector: true,
        application: true,
      },
    });
  }

  async getPage(page: number) {
    const total = await this.prisma.company.count();
    const companies = await this.prisma.company.findMany({
      select: {
        id: true,
        name: true,
        employees: true,
        job: true,
        rating: true,
        sector: true,
        application: true,
      },
      skip: (page - 1) * 10,
      take: 10,
    });
    return { companies, total };
  }

  async create(dto: CompanyDto) {
    const company = await this.prisma.company.create({
      data: {
        name: dto.name,
        employees: dto.employeeAmount,
        sector: dto.sector,
      },
    });
    return company;
  }

  async getCompany(id: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        id: id,
      },
    });
    return company;
  }

  async getLastApplications(id: string) {
    const application = await this.prisma.application.findMany({
      where: {
        companyId: id,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return application;
  }

  async getLastApplicationsByRecruiter(id: string) {
    const jobs = await this.prisma.job.findMany({
      where: {
        createdBy: id,
      },
      select: {
        application: true,
      },
      take: 10,
    });
    return jobs;
  }

  async getWeeklyApplicationsCount() {
    /*
    Return applications created in the last 7 days
    In the following format:
    monday: 10,
    tuesday: 5,
    ...
    */
    const applications = await this.prisma.application.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    // Process the applications to get the count per day
    const weeklyApplicationsCount = applications.reduce(
      (acc: { [key: string]: number }, application) => {
        const day = application.createdAt
          .toLocaleString('en-us', { weekday: 'long' })
          .toLowerCase();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      },
      {},
    );

    return weeklyApplicationsCount;
  }

  async update(id: string, dto: CompanyDto) {
    const company = await this.prisma.company.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        employees: dto.employeeAmount,
        rating: dto.rating,
      },
    });
    return company;
  }

  async delete(id: string) {
    return this.prisma.company.delete({
      where: {
        id: id,
      },
    });
  }
}
