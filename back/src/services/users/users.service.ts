const flatten = require('flat')
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { GoogleReviewDto, NegativeReviewDto, TripadvisorReviewDto, UserDto } from 'src/dto/user.dto';
import { QrCodeService } from '../qr-code/qr-code.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel("Users") private userModel: Model<UserDocument>, private qrCodeService: QrCodeService) {}

    async create(userDto: UserDto): Promise<User> {
        const createdUser = new this.userModel(userDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> { 
        return this.userModel.find().exec()
    }

    async addPromotionCodeToUser(userDto: UserDto): Promise<{code: string, qrCode: string}> {
        const code = this.generateUniqueId()
        const qrCode = `${code}.png`

        await this.userModel.updateOne({ email: userDto.email }, { $push: { promotionCodes: { code, qrCode, createdAt: new Date(), hasVerified: false } } }, {upsert: true})
        
        return {code, qrCode}
    }

    async updateUserReview(review: NegativeReviewDto | GoogleReviewDto | TripadvisorReviewDto ): Promise<void> {
        console.log(flatten(review))
        await this.userModel.updateOne({ email: review.email }, { $set: review}, {upsert: true})

    }

    generateUniqueId(digits = 5): string { 
        return Math.floor(Number(`1e+${digits}`) + Math.random() * Number(`9e+${digits}`)).toString()
    }
}

