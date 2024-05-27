import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, UploadedFile } from '@blazity/nest-file-fastify';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UploadVideoService } from './upload-video.service';
import {
  videoDTO,
  nameVideoDTO,
  descriptionpostDTO,
  userIdpostDTO,
  namepostDTO,
} from './upload-video.dto';
import { postDto } from 'src/post/dto';

@Controller('upload-video')
export class UploadVideoController {
  constructor(private readonly uploadVideoService: UploadVideoService) {}
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: videoDTO,
    @Body() namefile: nameVideoDTO,
    @Body() name: namepostDTO,
    @Body() description: descriptionpostDTO,
    @Body() userId: userIdpostDTO,
  ) {
    // if (file.mimetype !== 'application/pdf') {
    //   throw new HttpException(
    //     'File type not supported',
    //     HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    //   );
    // }

    const result = await this.uploadVideoService.upload(
      file,
      namefile,
      name,
      description,
      userId,
    );
    return result;
  }
  @Get('/')
  async request() {
    const result = await this.uploadVideoService.request();
    return result;
  }
}
