import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastyfyMultipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      ignoreTrailingSlash: true,
      bodyLimit: 20000000,
    }),
  );

  await app.register(helmet);
  await app.register(fastyfyMultipart);
  app.useGlobalPipes(new ValidationPipe());
  await app.register(compression);
  app.enableCors({
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
