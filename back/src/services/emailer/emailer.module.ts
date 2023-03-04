require('dotenv').config()
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { EmailerService } from './emailer.service';
import { join } from 'path';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { QrCodeService } from '../qr-code/qr-code.service';

@Module({
  imports: [ 
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"QR CODE" <${process.env.EMAIL_USER}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailerService, UsersService, { provide: getModelToken("Users"), useValue: {} }, QrCodeService],
  exports: [EmailerService],
})
export class EMailerModule {}