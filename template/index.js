const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use( async ( ctx ) => {
    let title = 'hello koa2'
    let name = '<script>alert(2345)</script>'
    await ctx.render('index', {
        title,
        name
    })
})

app.listen(3000, () => {
    console.log('template server is starting at port 3000')
})