import * as Router from 'koa-router'
const router = new Router()

import loginController from '@/controller/login'
import adminController from '@/controller/admin'
import roleController from '@/controller/role'
import menuController from '@/controller/menu'

router
  .post('/login', loginController.login)
  .post('/logout', loginController.logout)
  .post('/checkLogin', loginController.checkLogin)
  .get('/admin', adminController.find)
  .post('/admin', adminController.save)
  .delete('/admin', adminController.delete)
  .get('/role', roleController.find)
  .post('/role', roleController.save)
  .delete('/role', roleController.delete)
  .get('/menu', menuController.find)
  .post('/menu', menuController.save)
  .delete('/menu', menuController.delete)

export default router
