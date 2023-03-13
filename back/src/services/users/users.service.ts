require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { GoogleReviewDto, NegativeReviewDto, TripadvisorReviewDto, UserDto } from 'src/dto/user.dto';
import { UserAdminDocument } from 'src/schemas/userAdmin.schema';

@Injectable()
export class UsersService {

    constructor(@InjectModel("Users") private userModel: Model<UserDocument>, @InjectModel("UserAdmin") private userAdminModel: Model<UserAdminDocument>) {}

    async verifyCode(code: string) { 
        await this.userModel.updateOne({"promotionCodes.code": code.toString()}, {$set: {"promotionCodes.$.hasVerified": true}})
    }

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
        await this.userModel.updateOne({ email: review.email }, { $set: review}, {upsert: true})

    }

    async getTokenByUsernamePass(username: string, password: string): Promise<string | null> {
        const userAdmin = await this.userAdminModel.findOne({ username }, { token: 1, password: 1 })
        if (userAdmin) { 
            const compPass  = await bcrypt.compare(password, userAdmin?.password)
            if (compPass) {
                return userAdmin.token
            }
        }
        throw new UnauthorizedException('User Not Found');
    }

    async getToken(code: string) { 
        const res = await this.userAdminModel.findOne({ token: code })
        return res
    }

    async createToken(username: string, password: string) {
        const encryptedPassword = await this.encryptCode(password);
        const token = this.generateToken(username, encryptedPassword);
        await this.userAdminModel.updateOne({ username, password: encryptedPassword, token }, {upsert: true})
        return token;
    }

    private generateUniqueId(digits = 5): string { 
        return Math.floor(Number(`1e+${digits}`) + Math.random() * Number(`9e+${digits}`)).toString()
    }

    private generateToken(username: string, password: string) {
        return jwt.sign({ username, password }, process.env.TOKEN_SECRET);
    }

    private async encryptCode(code: string) { 
        // generate a salt
        const salt = await bcrypt.genSalt(10);
        // hash the password along with our new salt
        const hash = await bcrypt.hash(code, salt);

        return hash
    }
}

