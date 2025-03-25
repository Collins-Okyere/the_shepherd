import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { AuthController } from './controllers/auth/authentication.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Run the update to hash all users
  // const userService = app.get(AuthController);
  // await userService.hashExistingPasswords();

  // Enable Cookie Parsing
  app.use(cookieParser());

  // Enable CORS
  app.enableCors({
    credentials: true,  // Allows cookies/auth headers to be sent
    origin: '*',        // Allows requests from any origin (change later when hosting)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  });

  await app.listen(3300);
}
bootstrap();
