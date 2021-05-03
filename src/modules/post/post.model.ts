import { Document, Model, model, Schema } from 'mongoose';

// Core
import { BaseSchema } from '../../core/base.schema';

export interface IPost extends Document {
  title?: string;
  content?: string;
}

const postSchema = BaseSchema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  content: {
    type: Schema.Types.String,
    required: true,
  },
});

export const Post: Model<IPost> = model('Post', postSchema);
