import { createValidator } from 'express-joi-validation';
import postSchema from './post.validation';

const validator = createValidator({ passError: true });

export {
  validator,
  postSchema,
};
