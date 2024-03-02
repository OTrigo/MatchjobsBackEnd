import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { PostModule } from './post/post.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    authModule,
    UserModule,
    CompanyModule,
    JobModule,
    PostModule,
    CacheModule.register({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost/Matchjobs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
