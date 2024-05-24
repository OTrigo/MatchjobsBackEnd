import { Module } from '@nestjs/common';
import { UploadVideoService } from './upload-video.service';
import { UploadVideoController } from './upload-video.controller';

@Module({
  controllers: [UploadVideoController],
  providers: [UploadVideoService],
})
export class UploadVideoModule {}
