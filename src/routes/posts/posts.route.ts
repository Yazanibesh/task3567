import express from 'express';

// Controller
import postController from '../../modules/post/post.controller';

// Schema
import { validator, postSchema } from '../../validations';

const router = express.Router();

router.post(
  '/',
  validator.body(postSchema.create),
  postController.create,
);

router.get(
  '/',
  postController.index,
);

router.get(
  '/:id',
  postController.getById,
);

router.put(
  '/:id',
  validator.body(postSchema.update),
  postController.update,
);

router.delete(
  '/:id',
  postController.deleteById,
);

export default router;
