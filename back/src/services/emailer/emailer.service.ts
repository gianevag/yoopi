import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../users/users.service';
import { UserDto } from 'src/dto/user.dto';
import { QrCodeService } from '../qr-code/qr-code.service';

@Injectable()
export class EmailerService {
    constructor(private mailerService: MailerService, private userService: UsersService, private qrCodeService: QrCodeService) {}

    // method that create and send the qrcode
    async sendUserPromotionCode(user: UserDto, baseUrl: string) {
        
        // create code and update the db
        const { code, qrCode } = await this.userService.addPromotionCodeToUser(user)

        // create the qr code image using the code
        this.qrCodeService.generateQrCodeImage(code)
        
        // send email to the user
        await this.mailerService.sendMail({
        to: user.email,
        subject: 'Thank you for your feedback ❤️ get your discount coupon',
        template: './qrCodeEmail',
        context: {
            qrCode: `${baseUrl}/images/${qrCode}`,
            code,
        },
        });
    }
}