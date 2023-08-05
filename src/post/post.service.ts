import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma : PrismaService) {}

    async getPosts() {
        return this.prisma.posts.findMany({
            select:{
                id:true,
                name:true,
                description:true,
                createdAt:true,
                userId:true,
                user:true,
            }
        });
    }

    async getPost(id : string) {
        return this.prisma.posts.findUnique({
            where:{
                id:Number(id)
            }
        })
    }
}
