import * as Router from 'koa-router';
import passport from '../config/passport';
import { json } from '../utils';
import {code} from '../constants'
const router = new Router();

router
  .post('/login', (ctx, next) => {
    passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.body = json();
        return ctx.login(user);
      } else {
        ctx.body = json(
          {
            err,
            user,
            info,
            status
          },
          code.NOLOGIN,
          '登录失败'
        );
      }
    })(ctx, next);
  })
  .post('/logout', (ctx, next) => {
    ctx.logout();
    ctx.body = json();
  })
  .post('/checkLogin', (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.body = '认证通过';
    } else {
      ctx.throw(401);
      ctx.body = '非法访问';
    }
  });

export default router;
