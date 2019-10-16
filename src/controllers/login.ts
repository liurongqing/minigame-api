import { adminModel as Model } from '@/models'
import passport from '@/config/passport'
import { json } from '@/utils'
import { errcode } from '@/const'

export default {
  // get 查询列表
  async login(ctx: any, next: any) {
    passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.body = json()
        return ctx.login(user)
      } else {
        ctx.body = json({
          data: {
            err,
            user,
            info,
            status
          },
          code: errcode.LOGIN_ERROR,
          msg: '登录失败'
        })
      }
    })(ctx, next)
  },
  async logout(ctx: any) {
    ctx.logout()
    ctx.body = json()
  },
  async checkLogin(ctx: any) {
    if (ctx.isAuthenticated()) {
      ctx.body = '认证通过'
    } else {
      ctx.throw(401)
      ctx.body = '非法访问'
    }
  },
  async passportLogin(username: any, password: any) {
    const condition = { isDeleted: 0, username, password }
    const userInfo = await Model.find(condition)
    return userInfo
      ? json({ data: userInfo })
      : json({
          code: errcode.LOGIN_ERROR
        })
  }
}
