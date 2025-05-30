import { Types } from 'mongoose';

export interface WithObjectId {
  _id: Types.ObjectId | string;
}

export interface WithVersion {
  __v: number;
}

export interface WithTimestamps {
  createdAt: Date;
  updatedAt: Date;
}
