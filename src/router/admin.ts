import * as Router from 'koa-router'
const router = new Router()

import loginController from '@/controller/login'
// import activityController from '@/controller/activity'
// import menuController from '@/controller/menu'

router.post('/login', loginController.login).post('/logout', login.logout)
// .get('/activity', activityController.find)
// .post('/activity', activityController.save)
// .delete('/activity', activityController.delete)
// .get('/menu', menuController.find)
// .post('/menu', menuController.save)
// .delete('/menu', menuController.delete)

export default router
