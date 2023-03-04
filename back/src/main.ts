require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {useContainer, Validator} from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableCors();
  app.setGlobalPrefix("api")
  await app.listen(process.env.NEST_PORT || 3000);
}
bootstrap();
