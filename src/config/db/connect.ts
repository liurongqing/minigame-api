import * as mongoose from 'mongoose'
import config from './config'
const { user, pwd, database, host, port } = config

export default () => {
  mongoose.connect(`mongodb://${user}:${pwd}@${host}:${port}/${database}`, {
    useNewUrlParser: true
  })
  const db = mongoose.connection
  db.on('error', (err: any) => {
    console.error('连接数据库失败， %o', err)
  })

  db.on('open', () => {
    console.log('连接数据库成功')
  })
}
