import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  @ApiOperation({ summary: '登录接口', description: '用户名密码验证' })
  @ApiBody({
    description: '用户名密码',
    required: true,
    type: UserEntity,
  })
  async postAuth(@Body() loginDto: UserEntity) {
    const doc = await this.userService.findUserByMobileAndPassword(loginDto);
    return doc;
  }

  @Post()
  @ApiOperation({ summary: '添加用户', description: '添加用户' })
  @ApiBody({
    required: true,
    type: UserEntity,
  })
  create(@Body() createUserDto: UserEntity) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '查询用户', description: '查询所有用户' })
  async findAll() {
    return await this.userService.findAll();
  }
}
