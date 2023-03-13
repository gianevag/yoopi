import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAdminDocument } from 'src/schemas/userAdmin.schema';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@InjectModel("UserAdmin") private userAdminModel: Model<UserAdminDocument>) { }
    
  async canActivate(context: ExecutionContext){
    const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization as string;
      const exist = await this.userAdminModel.findOne({ token: token.replace("Bearer ", "") })
      return !!exist
  }
}