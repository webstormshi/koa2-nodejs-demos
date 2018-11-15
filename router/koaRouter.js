const Koa = require('Koa')
const fs = require('fs')
const app = new Koa()
const Router = require('koa-router')

const home = new Router()
home.get('/', ctx => {
    let html = `
    <ul>
        <li><a href="/page/helloworld">/page/helloworld</a></li>
        <li><a href="/page/404">/page/404</a></li>
    </ul>
    `
    ctx.body = html
})

let page = new Router()
page.get('/404', async ( ctx ) => {
    ctx.body = '404 page'
}).get('/hello', async ( ctx ) => {
    ctx.body = 'hello word!'
})

let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('router use middleware is starting at port 3000')
})