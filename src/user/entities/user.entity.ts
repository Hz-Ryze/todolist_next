import { ApiProperty } from '@nestjs/swagger';

import { UserInterface } from 'src/db/schemas/user.schema';

export class UserEntity implements UserInterface {
  @ApiProperty({ description: '手机号' })
  mobile: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '昵称' })
  nickname: string;
  @ApiProperty({ description: '加入的团队' })
  teams: string[];
}
