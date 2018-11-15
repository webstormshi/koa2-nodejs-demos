const Koa = require('koa')

// @2版本的写法
const convert = require('koa-convert')
const loggerGenerator = require('./middleware/logger-generator')
const app = new Koa()

// @1版本的写法
// app.use(loggerGenerator())

// @2版本的写法
app.use(convert(loggerGenerator()))

// @1版本的写法
// app.use(function *() {
//     this.body = 'hello world!'
// })

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
