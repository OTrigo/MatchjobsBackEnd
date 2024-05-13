import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, UploadedFile } from '@blazity/nest-file-fastify';
import { fileDTO } from './upload.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/")
  @UseInterceptors(FileInterceptor('file'))
  async uploadfile(@UploadedFile() file: fileDTO){
    if(file.mimetype !== 'application/pdf'){
      throw new HttpException('File type not supported', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    const result = await this.uploadService.upload(file)
    return result;
  }
}
