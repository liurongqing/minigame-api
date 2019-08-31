import * as Router from 'koa-router'
const router = new Router()

import admin from './admin'

router.use('/admin', admin.routes(), admin.allowedMethods())

export default router
