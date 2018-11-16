const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

// 配置存储session信息的mysql
let store = new MysqlSession({
    user: 'root',
    password: 'shiyong001',
    database: 'koa2_db',
    host: '127.0.0.1'
})

// 存放sessionId的cookie配置
let cookie = {
    maxAge: '',
    expires: '',
    path: '',
    domain: '',
    httpOnly: '',
    overwrite: '',
    secure: '',
    sameSite: '',
    signed: ''
}

app.use(session({
    key: 'SESSIN_ID',
    store: store,
    cookie: cookie
}))

// 启用session中间件
app.use( async ( ctx ) => {

    // 设置session
    if ( ctx.url === '/set' ) {
        ctx.session = {
          user_id: Math.random().toString(36).substr(2),
          count: 0
        }
        ctx.body = ctx.session
    } else if ( ctx.url === '/' ) {
            // 读取session信息
            ctx.session.count = ctx.session.count + 1
            ctx.body = ctx.session
    }
})

app.listen(3000, () => {
    console.log('session is starting at port 3000')
})