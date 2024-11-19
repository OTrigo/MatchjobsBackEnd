import { HttpException, Injectable } from '@nestjs/common';
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

  async getWeeklyApplicationsCount(req: any) {
    let data = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    };

    if (req.companyId === null) {
      throw new HttpException('Unauthorized', 401);
    }

    const applications = await this.prisma.application.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
        companyId: req.companyId,
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

    data = { ...data, ...weeklyApplicationsCount };
    console.log(data);

    return data;
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
