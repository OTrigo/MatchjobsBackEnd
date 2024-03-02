import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      ignoreTrailingSlash: true,
    }),
  );
  await app.register(helmet);
  app.useGlobalPipes(new ValidationPipe());
  await app.register(compression);
  app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
