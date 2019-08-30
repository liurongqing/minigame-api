import * as mongoose from 'mongoose'
import config from './config'
const { user, pwd, database, host, port } = config

export default () => {
  mongoose.connect(`mongodb://${user}:${pwd}@${host}:${port}/${database}`, {
    useNewUrlParser: true
  })
  const db = mongoose.connection
  db.on('error', (err: any) => {
    console.error('connect mongodb fail， %o', err)
  })

  db.on('open', () => {
    console.log('connect mongodb success')
  })
}
