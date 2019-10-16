import * as passport from 'koa-passport'
import { Strategy } from 'passport-local'

import loginController from '@/controllers/login'

const fetchUser = (() => {
  const user = { id: 1, username: 'test', password: 'test' }
  return async function() {
    return user
  }
})()

// 序列化  ctx.login() 触发
passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

// 反序列化 请求时返回
passport.deserializeUser(async (user, done) => {
  try {
    const user = {
      username: '13'
    }
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// 登录验证时触发
passport.use(
  new Strategy(function(username, password, done) {
    loginController
      .passportLogin(username, password)
      .then(response => {
        if (response.code === 0) {
          done(null, response.data)
        } else {
          done(null, false)
        }
      })
      .catch(err => done(err))

    fetchUser()
      .then(user => {
        if (username === user.username && password === user.password) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
      .catch(err => done(err))
  })
)

export default passport
