import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistInDbConstraint implements ValidatorConstraintInterface {
    constructor(@InjectModel("Users") private userModel: Model<UserDocument>) { }
    validate(userName: string, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;

        let queryObj = {}
        queryObj["email"] = args.object["email"];
        queryObj[relatedPropertyName] = true; 
        return this.userModel.findOne(queryObj).then((user) => { 
        if (user) return false;
        return true;
      })
    };
}


export function IsExistInDb(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
      registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsExistInDbConstraint,
    });
  };
}

export function HasSubmittedProps(properties: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
      registerDecorator({
      name: "hasSubmittedProps",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [properties],
      validator: {
              validate(value: any, args: ValidationArguments) {
                  return properties.reduce((acc, cur) => {
                      if (args.object.hasOwnProperty(cur)) {
                          acc = true && !acc
                      }
                      return acc
                  }, false)
              }
          }
    });
  };
}

export function IsExistOtherProp(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
      registerDecorator({
      name: "isExistOtherProp",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
          validate(value: any, args: ValidationArguments) {
              return args.object.hasOwnProperty(property)
              }
          }
    });
  };
}