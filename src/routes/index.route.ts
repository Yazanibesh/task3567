import * as express from 'express';

import defaultRoute from './default/default.route';
import postsRoute from './posts/posts.route';

const router = express.Router();

router.use('/', defaultRoute);
router.use('/posts', postsRoute);

export default router;
