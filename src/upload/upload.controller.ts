import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { uploadService } from './upload.service';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/user/dto';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: uploadService) {}

  @Post('uploadVideo/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @Req() req: any,
    @UploadedFile() file: File,
    @Param('id') postId: string,
  ) {
    return this.uploadService.uploadVideo(req, file, postId);
  }

  @Post('uploadPdf')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@Req() req: any, @UploadedFile() file: File) {
    return this.uploadService.uploadPdf(req, file);
  }

  @Get('getVideo/:videoUrl')
  @Header('Accept-Ranges', 'bytes')
  async getVideo(@Param('videoUrl') videoUrl: string) {
    return this.uploadService.getvideoFile(videoUrl);
  }

  @Get('getPdf/:id')
  @Header('Accept-Ranges', 'bytes')
  @UseGuards(AuthGuard('jwt'))
  async getPdf(@Param('id') id: string) {
    return this.uploadService.getPdfFile(id);
  }

  @Get('getMyPdf')
  @Header('Accept-Ranges', 'bytes')
  @UseGuards(AuthGuard('jwt'))
  async getMyPdf(@Req() req: any) {
    return this.uploadService.getMyPdf(req);
  }
}
