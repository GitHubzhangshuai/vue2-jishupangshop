const {connect, initSchema} = require('./database/init.js')
const mongoose = require('mongoose')
const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
let user = require('./appApi/User')
const app = new Koa()
const router = new Router()
app.use(bodyparser())
app.use(cors())
// 装载所有子路由
router.use('/user', user.routes())
// 加载路由中间件
app.use(router.routes())
let goods = require('./appApi/goods.js')
router.use('/goods', goods.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchema()
//   const User = mongoose.model('User')
//   let oneUser = new User({userName: 'jspang', password: '123456'})
//   await oneUser.save().then(() => {
//     console.log('插入成功')
//   }).catch(e => console.log(e))
//   let users = await User.findOne().exec()
//   console.log('**************************')
//   console.log(users)
//   console.log('**************************')
})()

app.use(async (ctx) => {
  ctx.body = 'hello'
})

app.listen(3000, () => {
  console.log('service is running at port 3000')
})
