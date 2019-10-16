import 'module-alias/register'
// require('module-alias/register')
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session2'

import db from '@/config/db/connect'
import routers from '@/routers'
import { errcode } from '@/const'
import { json } from '@/utils'
import passport from '@/config/passport'
import { noAuthLoginList } from '@/const'

const app = new Koa()

// 数据库初始化连接
db()

app.use(bodyParser())

// 启用认证路由
// app.proxy = true
// app.use(session({ key: 'SESSIONID' }))
// app.use(passport.initialize())
// app.use(passport.session())

// // 登录验证判断
// app.use(async (ctx: any, next) => {
//   const url = ctx.originalUrl
//   if (
//     !ctx.isAuthenticated() &&
//     !noAuthLoginList.some(v => v.indexOf(url) !== -1)
//   ) {
//     // 没登录, 且不在白名单里面
//     ctx.body = json({}, code.NO_LOGIN)
//     return
//   } else {
//     await next()
//   }
// })

// app.use(async (ctx: any, next) => {
//   try {
//     await next()
//   } catch (err) {
//     ctx.body = json('', code.DATABASE_ERROR, err.message)
//     ctx.app.emit('error', err, ctx)
//   }
// })

app.use(routers.routes()).use(routers.allowedMethods())

app.use(async ctx => {
  ctx.body = json({
    code: errcode.NOT_FOUND,
    msg: '该接口不存在！'
  })
})

app.on('error', err => {
  console.error(err.message)
})

app.listen(9001, () => {
  console.log('服务端口 9001 启动成功...')
})
