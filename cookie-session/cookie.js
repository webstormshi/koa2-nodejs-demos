const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
    if(ctx.url === '/index') {
        ctx.cookies.set(
            'cid',    // key
            'hello world',    // value
            {
                domain: 'localhost',   // 写cookie所在的域名
                path: '/index',    // 写cookie所在的路径
                maxAge: 10 * 60 * 1000,   // cookie有效时长
                expires: new Date('2017-02-15'),  // cookie失效时间
                httpOnly: false,   // 是否仅用于http请求中获取
                overwrite: false  // 是否允许重写
            }
        )
        ctx.body = 'cooike is ok'
    }
})

app.listen(3000, () => {
    console.log('cookie is starting at port 3000')
})