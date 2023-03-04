import { Body, Controller, Post, Redirect, Req, Res } from '@nestjs/common';
import { GoogleReviewDto, NegativeReviewDto, TripadvisorReviewDto, UserDto } from 'src/dto/user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { EmailerService } from 'src/services/emailer/emailer.service';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private emailerService: EmailerService, private usersService: UsersService) { }

    @Post("/create-review")
    async createUserReview(@Body(new ValidationPipe()) body: UserDto, @Req() req: Request) {
        const baseUrl = `${req.protocol}://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        return "OK"
    }

    @Post("/create-negative-review")
    async createNegativeReview(@Body(new ValidationPipe()) body: NegativeReviewDto, @Req() req: Request) { 
        const baseUrl = `${req.protocol}://${req.get('Host')}`
        //await this.emailerService.sendUserPromotionCode(body, baseUrl)
        await this.usersService.updateUserReview(body)
        return "OK"
    }

    @Post("/create-google-review")    
    async createGoogleReview(@Body(new ValidationPipe()) body: GoogleReviewDto, @Req() req: Request) {
        const baseUrl = `${req.protocol}://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        await this.usersService.updateUserReview(body)
        return {
            redirect: "https://www.google.com/"
        }
    }


    @Post("/create-tripadvisor-review")
    async createTripadvisorReview(@Body(new ValidationPipe()) body: TripadvisorReviewDto, @Req() req: Request) { 
        const baseUrl = `${req.protocol}://${req.get('Host')}`
        await this.emailerService.sendUserPromotionCode(body, baseUrl)
        await this.usersService.updateUserReview(body)
        return {
            redirect: "https://www.tripadvisor.com/"
        }
    }
}