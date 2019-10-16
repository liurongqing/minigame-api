import * as Router from 'koa-router'
const router = new Router()

import loginController from '@/controllers/login'
import adminController from '@/controllers/admin'
import roleController from '@/controllers/role'
import menuController from '@/controllers/menu'
import permissionsController from '@/controllers/permissions'

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
  .get('/permissions', permissionsController.find)
  .post('/permissions', permissionsController.save)

export default router
