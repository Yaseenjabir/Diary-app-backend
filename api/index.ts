import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@codegenie/serverless-express';
import { AppModule } from '../src/app.module';

let cachedServer: ReturnType<typeof serverlessExpress>;

async function bootstrap() {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.init();

  return serverlessExpress({ app: expressApp });
}

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return cachedServer(req, res);
}
