import { Injectable } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { TaskModel } from 'src/db/db.models';

@Injectable()
export class TaskService {
  async create(createTaskDto: TaskEntity) {
    return await TaskModel.create(createTaskDto);
  }

  async findAll(params: any) {
    // teams: _teams,
    // mobile,

    const orArray: any = [
      {
        'assignee.mobile': params.mobile,
      },
      {
        'follower.mobile': params.mobile,
      },
      {
        'creator.mobile': params.mobile,
      },
    ];
    if (params.teams && params.teams.length > 0) {
      orArray.push({
        teams: {
          $in: params.teams,
        },
      });
    }
    const filter = {
      $or: orArray,
    };

    return await TaskModel.find(filter).sort({ createdAt: 'desc' });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(uuid: string, updateTaskDto: TaskEntity) {
    return await TaskModel.updateOne({ UUID: uuid }, updateTaskDto).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
