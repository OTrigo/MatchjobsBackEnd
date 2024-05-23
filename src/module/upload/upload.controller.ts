import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, UploadedFile } from '@blazity/nest-file-fastify';
import { fileDTO, nameDTO } from './upload.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: fileDTO,  @Body() namefile: nameDTO) {
    if (file.mimetype !== 'application/pdf') {
      throw new HttpException(
        'File type not supported',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
    }
    const result = await this.uploadService.upload(file, namefile);
    return result;
  }
}
