import { Types } from 'mongoose';

export interface CommonProperties {
  _id: Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
