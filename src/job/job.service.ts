import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
    constructor(private prisma : PrismaService){}

    async getAll() {
        return this.prisma.jobs.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                createdAt:true,
                available:true,
                company:true,
                companyId:true,
            }
        });
    }
}
