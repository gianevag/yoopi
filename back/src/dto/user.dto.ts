import { IsEmail, IsIn, IsBoolean, IsOptional} from 'class-validator';
import { HasSubmittedProps, IsExistInDb, IsExistOtherProp } from 'src/validators/user.validator';

export type experienceType = "positive" | "negative"

export interface negativeFormInputsType { 
    overall: number
    service: number
    food: number
    reviewtext: string
}

export class UserDto {

    @IsEmail()
    email: string;
    
}

export class NegativeReviewDto extends UserDto { 
    constructor() { 
        super()
    }

    @IsEmail()
    @HasSubmittedProps(["submitedForm"], {message: "Invalid Request"})
    email: string;

    @IsIn(["positive", "negative"])
    experience: experienceType;

    @IsBoolean()
    subToMailList: boolean

    @IsBoolean()
    @IsOptional()
    @IsExistInDb('submitedForm', { message: 'You have already submitted the form.' })        
    submitedForm: boolean

    @IsOptional()
    @IsExistOtherProp("submitedForm", { message: 'with negativeFormInputs should be exist the submitedForm field'})
    negativeFormInputs: negativeFormInputsType
}

export class GoogleReviewDto extends UserDto { 

    @IsEmail()
    @HasSubmittedProps(["clickedGoogle"], {message: "invalid request"})
    email: string;

    @IsIn(["positive", "negative"])
    experience: experienceType;

    @IsBoolean()
    subToMailList: boolean

    @IsBoolean()
    @IsOptional()   
    @IsExistInDb('clickedGoogle', { message: 'You have already given us a Google evaluation.' })
    clickedGoogle: boolean

}

export class TripadvisorReviewDto extends UserDto { 

    @IsEmail()
    @HasSubmittedProps(["clickedTripadvison"], {message: "invalid request"})
    email: string;

    @IsIn(["positive", "negative"])
    experience: experienceType;

    @IsBoolean()
    subToMailList: boolean

    @IsBoolean()
    @IsOptional()
    @IsExistInDb('clickedTripadvison', { message: 'You have already given us a Tripadvisor evaluation.' })
    clickedTripadvison: boolean

}

