import { BlobServiceClient } from '@azure/storage-blob';
import { File } from '@nest-lab/fastify-multer';
import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class uploadService {
  constructor(private prisma: PrismaService) {}

  async uploadVideo(req: any, file: File, postId: string) {
    const azureConnection = process.env.AZURE_CONNECTION as string;
    const buffer = file.buffer as Buffer;
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const container = blobService.getContainerClient('videoupload');
    const filename = `${req.user.name}${Date.now()}-${file.originalname.replace(
      ' ',
      '',
    )}`;
    const blobClient = container.getBlockBlobClient(filename);
    await blobClient.uploadData(buffer);
    const post = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        videoUrl: filename,
      },
    });
    return post;
  }

  async uploadPdf(req: any, file: File) {
    const azureConnection = process.env.AZURE_CONNECTION as string;
    const buffer = file.buffer as Buffer;
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const container = blobService.getContainerClient('cvupload');
    const filename = `${req.user.name}${Date.now()}-${file.originalname.replace(
      ' ',
      '',
    )}`;
    const blobClient = container.getBlockBlobClient(filename);
    await blobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: 'application/pdf',
      },
    });
    const userId = req.user.id as string;
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        portifolio: filename,
      },
    });
    return user;
  }

  async getvideoFileFirefox(videoUrl: string, range: any, res: any) {
    const azureConnection = process.env.AZURE_CONNECTION as string;
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const container = blobService.getContainerClient('videoupload');
    const blobClient = container.getBlockBlobClient(videoUrl);
    const properties = await blobClient.getProperties();
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : properties.contentLength;
      if (end === undefined) {
        throw new HttpException(
          'Invalid range',
          HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
        );
      }
      const chunkSize = end - start + 1;
      const file = await blobClient.download(start, chunkSize);
      res.status(HttpStatus.PARTIAL_CONTENT);
      res.headers[
        'Content-Range'
      ] = `bytes ${start}-${end}/${properties.contentLength}`;
      res.headers['content-length'] = chunkSize;
      return file.readableStreamBody;
    } else {
      const file = await blobClient.download(0);
      return file.readableStreamBody;
    }
  }

  async getvideoFile(videoUrl: string) {
    const azureConnection = process.env.AZURE_CONNECTION as string;
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const container = blobService.getContainerClient('videoupload');
    const blobClient = container.getBlockBlobClient(videoUrl);
    const file = await blobClient.downloadToBuffer();
    return new StreamableFile(file, {
      length: file.byteLength,
    });
  }

  async getPdfFile(id: string): Promise<Buffer> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const portifolio = user?.portifolio as string;
    const azureConnection = process.env.AZURE_CONNECTION as string;
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const container = blobService.getContainerClient('cvupload');
    const blobClient = container.getBlockBlobClient(portifolio);
    const file = await blobClient.downloadToBuffer();
    return file;
  }

  async getMyPdf(req: any): Promise<Buffer> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    const portifolio = user?.portifolio as string;
    const azureConnection = process.env.AZURE_CONNECTION as string;
    const blobService = BlobServiceClient.fromConnectionString(azureConnection);
    const container = blobService.getContainerClient('cvupload');
    const blobClient = await container.getBlockBlobClient(portifolio);
    const file = await blobClient.downloadToBuffer();
    return file;
  }
}
