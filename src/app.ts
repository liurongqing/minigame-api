import * as Koa from 'koa'
import db from './config/db/connect'
import routers from './routers'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session2'
import { code } from './constants'
import { json } from './utils'

import passport from './config/passport'

const app = new Koa()

// 数据库初始化连接
db()

app.use(bodyParser())

// 启用认证路由
app.proxy = true
app.use(session({ key: 'SESSIONID' }))
app.use(passport.initialize())
app.use(passport.session())

// 登录验证判断
// app.use(async (ctx: any, next) => {
//   const url = ctx.originalUrl
// //   console.log(url)
// //   console.log(url.search('auth/login'))
//   if (!ctx.isAuthenticated() && url.search('auth/login') < 0) {
//     // console.log('2...')
//     ctx.body = json({}, code.NOLOGIN)
//     return
//   } else {
//     // console.log('3...')
//     await next()
//   }
// })

app.use(async (ctx: any, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = json('', code.DATABASE, err.message)
    ctx.app.emit('error', err, ctx)
  }
})

app.use(routers.routes()).use(routers.allowedMethods())

app.use(async ctx => {
  ctx.body = json('', code.NOTFOUND, '该接口不存在！')
})

app.on('error', err => {
  console.error(err.message)
})

app.listen(9001, () => {
  console.log('koa 监听 9001 端口 启动成功...')
})
