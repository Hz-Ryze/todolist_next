import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Headers,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';
import { UserInterface } from 'src/db/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('task')
@ApiTags('任务')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建任务', description: '创建任务' })
  @ApiBody({
    required: true,
    type: TaskEntity,
  })
  async create(@Body() createTaskDto: TaskEntity) {
    return await this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: '查询所有任务', description: '查询所有任务' })
  async findAll(@Headers() headers: any) {
    const token = headers.authorization;
    const mobile = token.replace('Bearer ', '');
    const docs = await this.userService.findUserByMobile([mobile]);
    const _teams = [];
    for (const doc of docs ?? []) {
      _teams.push(...doc.teams);
    }

    return await this.taskService.findAll({
      teams: _teams,
      mobile,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '查询任务', description: '查询任务' })
  @ApiParam({ name: 'id', type: String, description: '根据UUID查询' })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, description: '根据UUID更新' })
  @ApiBody({
    description: '！！！请注意，这里是Put请求，请传入完整数据！！！',
    required: true,
    type: TaskEntity,
  })
  async updatePut(
    @Param('id') id: string,
    @Headers() headers: any,
    @Body() updateTaskDto: TaskEntity,
  ) {
    const assignee: UserInterface[] = updateTaskDto.assignee;
    if (assignee.length > 0) {
      const mobiles: string[] = assignee.map((item) => {
        return item.mobile;
      });
      const docs = await this.userService.findUserByMobile(mobiles);
      let _teams = [];
      for (const doc of docs ?? []) {
        _teams.push(...doc.teams);
      }
      _teams = [...new Set(_teams)];
      updateTaskDto.teams = _teams;
    }

    this.taskService.update(id, updateTaskDto);
    return this.findAll(headers);
  }
}
