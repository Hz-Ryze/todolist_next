import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserModel } from 'src/db/db.models';

@Injectable()
export class UserService {
  async findUserByMobileAndPassword(loginDto: UserEntity) {
    const _doc = await UserModel.findOne({
      mobile: loginDto.mobile,
      password: loginDto.password,
    });
    return _doc;
  }

  async create(createUserDto: UserEntity) {
    return await UserModel.create(createUserDto);
  }
  async findUserByMobile(mobile: string[]) {
    return await UserModel.find({ mobile: { $in: mobile } });
  }

  async findAll() {
    return await UserModel.find({});
  }
}
