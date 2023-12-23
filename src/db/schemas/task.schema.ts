/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { UserInterface } from './user.schema';

interface TaskInterface {
  UUID: string;
  title?: string;
  creator: UserInterface;
  assignee?: UserInterface[];
  follower?: UserInterface[];

  description?: string;
  sub_task?: TaskInterface[];
  comment?: CommentInterface[];
  status?: string;
  start_date?: Date;
  due_date?: Date;

  teams?: string[];

  createdAt: Date;
  updatedAt: Date;
}

interface CommentInterface {
  description: string;
  user?: UserInterface;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema(
  {
    UUID: String,
    title: String,
    creator: [mongoose.Schema.Types.Mixed],
    assignee: [mongoose.Schema.Types.Mixed],
    description: String,
    sub_task: {
      type: [{}],
    },
    teams: [String],
    comment: [mongoose.Schema.Types.Mixed],
    follower: [mongoose.Schema.Types.Mixed],
    status: {
      type: String,
      default: '进行中',
    },
    start_date: Date,
    due_date: Date,
  },
  { timestamps: true },
);

interface TaskDoc extends mongoose.Document, TaskInterface {}

export { TaskInterface, CommentInterface, TaskDoc, TaskSchema };
