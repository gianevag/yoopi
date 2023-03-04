import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { experienceType, negativeFormInputsType } from 'src/dto/user.dto';
import { PromotionCode } from 'src/interfaces/promotionCode';

@Schema()
class NegativeFormInputs implements negativeFormInputsType { 
    
    @Prop()
    overall: number;

    @Prop()
    service: number;

    @Prop()
    food: number;

    @Prop()
    reviewtext: string;
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    email: string;

    @Prop()
    promotionCodes: PromotionCode[];

    @Prop()
    experience: experienceType;

    @Prop()    
    subToMailList: boolean  

    @Prop()  
    submitedForm?: boolean

    @Prop() 
    clickedGoogle: boolean

    @Prop()
    clickedTripadvison: boolean

    @Prop()
    negativeFormInputs: NegativeFormInputs
}

export const UserSchema = SchemaFactory.createForClass(User);