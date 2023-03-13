import { Body, Controller, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleReviewDto, NegativeReviewDto, signInDto, TripadvisorReviewDto, UserDto, VerifyCodeDto } from 'src/dto/user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { EmailerService } from 'src/services/emailer/emailer.service';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { AuthGuard } from 'src/services/auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private emailerService: EmailerService, private usersService: UsersService) { }

    @Post("/create-review")
    async createUserReview(@Body(new ValidationPipe()) body: UserDto, @Req() req: Request) {
        const baseUrl = `https://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        return "OK"
    }

    @Post("/create-negative-review")
    async createNegativeReview(@Body(new ValidationPipe()) body: NegativeReviewDto, @Req() req: Request) { 
        const baseUrl = `https://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        await this.usersService.updateUserReview(body)
        return "OK"
    }

    @Post("/create-google-review")    
    async createGoogleReview(@Body(new ValidationPipe()) body: GoogleReviewDto, @Req() req: Request) {
        const baseUrl = `https://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        await this.usersService.updateUserReview(body)
        return {
            redirect: "https://www.google.com/"
        }
    }


    @Post("/create-tripadvisor-review")
    async createTripadvisorReview(@Body(new ValidationPipe()) body: TripadvisorReviewDto, @Req() req: Request) { 
        const baseUrl = `https://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        await this.usersService.updateUserReview(body)
        return {
            redirect: "https://www.tripadvisor.com/"
        }
    }


    @UseGuards(AuthGuard)
    @Post("/verify-code")
    async verifyCode(@Body(new ValidationPipe()) body: VerifyCodeDto) { 
        await this.usersService.verifyCode(body.code)
        return "OK"
    }


    @Post("/sign-in")
    async signIn(@Body() body: signInDto, ) { 
        const token = await this.usersService.createToken(body.username, body.password)
        return token;
    }

    @Post("/log-in")
    async logIn(@Body() body: signInDto) { 
        const token = await this.usersService.getTokenByUsernamePass(body.username, body.password)
        return token;
    }


}
