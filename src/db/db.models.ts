import * as Mongoose from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { TaskSchema } from './schemas/task.schema';

Mongoose.connect('mongodb://127.0.0.1:27018/admin');

const UserModel = Mongoose.model('user', UserSchema);
const TaskModel = Mongoose.model('task', TaskSchema);

export { UserModel, TaskModel };
