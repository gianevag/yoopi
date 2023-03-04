import { IsEmail } from 'class-validator';

export class ReviewBodyDto {
    @IsEmail()
    email: string;
}