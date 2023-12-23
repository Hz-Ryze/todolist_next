import { ApiProperty } from '@nestjs/swagger';
import { TaskInterface, CommentInterface } from 'src/db/schemas/task.schema';
import { UserInterface } from 'src/db/schemas/user.schema';
import { UserEntity } from 'src/user/entities/user.entity';

export class TaskEntity implements TaskInterface {
  @ApiProperty({ description: 'UUID' })
  UUID: string;
  @ApiProperty({ description: '标题' })
  title: string;
  @ApiProperty({ description: '创建者', type: UserEntity })
  creator: UserInterface;
  @ApiProperty({ description: '负责人', type: UserEntity })
  assignee?: UserInterface[];
  @ApiProperty({ description: '详细' })
  description?: string;
  @ApiProperty({ description: '子任务', type: TaskEntity })
  sub_task?: TaskInterface[];
  @ApiProperty({ description: '评论内容' })
  comment?: CommentInterface[];
  @ApiProperty({ description: '关注者', type: UserEntity })
  follower?: UserInterface[];
  @ApiProperty({ description: '任务状态' })
  status?: string;

  @ApiProperty({ description: '共享团队' })
  teams?: string[];

  @ApiProperty({ description: '任务开始时间' })
  start_date?: Date;
  @ApiProperty({ description: '任务截止时间' })
  due_date?: Date;
  @ApiProperty({ description: '任务创建时间' })
  createdAt: Date;
  @ApiProperty({ description: '任务更新时间' })
  updatedAt: Date;
}
