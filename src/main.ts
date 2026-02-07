import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS - Allows the mobile app to make requests to this API
  app.enableCors({
    origin: '*', // Allow all origins (for development)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 Backend server running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📱 Mobile app can connect to: http://localhost:${process.env.PORT ?? 3000}/api/entries`,
  );
}
void bootstrap();
