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
        employeeAmount: true,
        jobs: true,
        rating: true,
        sector: true,
      },
    });
  }

  async create(dto: CompanyDto) {
    const company = await this.prisma.company.create({
      data: {
        name: dto.name,
        employeeAmount: dto.employeeAmount,
        sector: dto.sector,
      },
    });
    return company;
  }

  async getCompany(id: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id: Number(id),
      },
    });
    return company;
  }

  async update(id: number, dto: CompanyDto) {
    const company = await this.prisma.company.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        employeeAmount: dto.employeeAmount,
        rating: dto.rating,
      },
    });
    return company;
  }

  async delete(id: number) {
    return this.prisma.company.delete({
      where: {
        id: id,
      },
    });
  }
}
