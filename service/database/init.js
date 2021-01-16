const mongoose = require('mongoose')
const glob = require('glob')
const {resolve} = require('path')
const db = 'mongodb://localhost/smile-db'

mongoose.Promise = global.Promise
exports.connect = () => {
  mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  let maxConnectTimes = 3
  let count = 0
  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('*************数据库断开**************')
      if (count < maxConnectTimes) {
        count++
        mongoose.connect(db)
      } else {
        reject(new Error('数据库出现问题'))
      }
    })
    mongoose.connection.on('error', err => {
      if (count < maxConnectTimes) {
        count++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error(err)
      }
    })
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
