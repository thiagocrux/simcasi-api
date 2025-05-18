import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      enum: ['user', 'admin', 'viewer'],
      unique: true,
      required: true,
    },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  },
  { timestamps: true }
);

export const Role = model('Role', schema);
