import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserAdminDocument = HydratedDocument<UserAdmin>;

@Schema()
export class UserAdmin {

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    token: string;

}

export const UserAdminSchema = SchemaFactory.createForClass(UserAdmin);