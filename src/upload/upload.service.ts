import { BlobServiceClient } from '@azure/storage-blob';
import { File } from '@nest-lab/fastify-multer';
import { Injectable, StreamableFile } from '@nestjs/common';
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

  async getvideoFile(videoUrl: string): Promise<StreamableFile> {
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
