const http = require('http')
const fs = require('fs')
const path = require('path')
const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域
  res.setHeader('Content-type', 'application/json;charset=utf-8') // 设置utf-8编码防止出现乱码
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')))
  res.end(JSON.stringify(data))
})
server.listen(2233)
console.log('server is running in port:2233')
