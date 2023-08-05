import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    authModule,
    UserModule,
    CompanyModule,
    JobModule,
    PostModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
