/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

interface UserInterface {
  mobile: string;
  password: string;
  nickname: string;
  teams: string[];
}

const UserSchema = new mongoose.Schema(
  {
    mobile: String,
    password: String,
    nickname: String,
    teams: [String],
  },
  { timestamps: true },
);

interface UserDoc extends mongoose.Document, UserInterface {}

export { UserInterface, UserDoc, UserSchema };
