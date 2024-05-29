import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, UploadedFile } from '@blazity/nest-file-fastify';
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
  @Get('/delete/:path/:id')
  async delete(
    @Param('path') path: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.uploadVideoService.deleteVideo(path, id);
    return result;
  }
}
