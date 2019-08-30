import * as Router from 'koa-router';
const router = new Router();

import admin from './admin';
import auth from './auth';

router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/auth', auth.routes(), auth.allowedMethods());

export default router;
