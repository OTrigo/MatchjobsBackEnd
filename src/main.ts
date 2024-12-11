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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      ignoreTrailingSlash: true,
      bodyLimit: 20000000,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Matchjobs API')
    .setDescription('The Matchjobs set of APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  await app.register(helmet);
  await app.register(fastyfyMultipart);
  app.useGlobalPipes(new ValidationPipe());
  await app.register(compression);
  app.enableCors({
    credentials: true,
  });

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen({ port: 3000, host: '0.0.0.0' });
}
bootstrap();
