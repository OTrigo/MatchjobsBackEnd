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
