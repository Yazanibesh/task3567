import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const BaseSchema = (document: object): Schema => {
  const doc = {
    ...document,
    _id: {
      type: Schema.Types.String,
      default: uuidv4,
    },
    isDeleted: {
      type: Schema.Types.Boolean,
      default: 0,
      select: false,
    },
    __v: {
      type: Schema.Types.Number,
      select: false,
    },
  };
  return new Schema(doc, { timestamps: true });
};
