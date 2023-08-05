import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
    constructor(private prisma : PrismaService) {}

    async getAll() {
        return this.prisma.company.findMany({
            select:{
                id:true,
                name:true,
                employeeAmount:true,
                jobs:true,
                rating:true,
                sector:true,
            }
        });
    }
}
