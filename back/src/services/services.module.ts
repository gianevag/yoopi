import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { QrCodeService } from './qr-code/qr-code.service';
import { EmailerService } from './emailer/emailer.service';
import { EMailerModule } from './emailer/emailer.module';
import { hasVerifyCodeDbConstraint, IsExistInDbConstraint } from 'src/validators/user.validator';
import { UserAdminSchema } from 'src/schemas/userAdmin.schema';
import { AuthGuard } from './auth/auth.guard';

@Module({
    imports: [EMailerModule,
        MongooseModule.forFeature([
            { name: "Users", schema: UserSchema },
            { name: "UserAdmin", schema: UserAdminSchema }
        ])
    ],
    providers: [UsersService, QrCodeService, EmailerService, IsExistInDbConstraint, hasVerifyCodeDbConstraint, AuthGuard],
    exports: [UsersService, QrCodeService, EmailerService, AuthGuard]
})
export class ServicesModule {}
