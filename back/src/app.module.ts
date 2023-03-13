require('dotenv').config()
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users/users.controller';
import { ServicesModule } from './services/services.module';
import { ImagesController } from './controllers/images/images.controller';
import { ConfigModule } from '@nestjs/config';
import { UserAdminSchema } from './schemas/userAdmin.schema';

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;


@Module({
  imports: [ServicesModule, ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRoot(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`), MongooseModule.forFeature([
            { name: "UserAdmin", schema: UserAdminSchema }
        ])],
  controllers: [AppController, UsersController, ImagesController],
  providers: [AppService],
})
export class AppModule {}
