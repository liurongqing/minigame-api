import * as Router from 'koa-router'
const router = new Router()

import activityController from '../controllers/activity';
import menuController from '../controllers/menu';

router
  .get('/activity', activityController.find)
  .post('/activity', activityController.save)
  .delete('/activity', activityController.delete)
  .get('/menu', menuController.find)
  .post('/menu', menuController.save)
  .delete('/menu', menuController.delete);

export default router
