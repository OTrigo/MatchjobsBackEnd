import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { uploadService } from './upload.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UploadController],
  providers: [uploadService],
})
export class UploadModule {}
