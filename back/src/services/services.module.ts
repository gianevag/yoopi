import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { QrCodeService } from './qr-code/qr-code.service';
import { EmailerService } from './emailer/emailer.service';
import { EMailerModule } from './emailer/emailer.module';
import { hasVerifyCodeDbConstraint, IsExistInDbConstraint } from 'src/validators/user.validator';

@Module({
    imports: [EMailerModule, MongooseModule.forFeature([{ name: "Users", schema: UserSchema}])],
    providers: [UsersService, QrCodeService, EmailerService, IsExistInDbConstraint, hasVerifyCodeDbConstraint],
    exports: [UsersService, QrCodeService, EmailerService]
})
export class ServicesModule {}
