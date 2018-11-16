const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')

const app = new Koa()

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

const staticPath = './public'

app.use(convert(static(
    path.join(__dirname, staticPath)
)))

app.use( async ( ctx ) => {
    if (ctx.method === 'GET') {
        let title = 'upload pic async'
        await ctx.render('index', {
            title
        })
    } else if ( ctx.url === '/api/picture/upload' && ctx.method === 'POST' ) {
        // 上传文件请求
        let result = { success: false }
        let serverFilePath = path.join(__dirname, 'static/image' )
        
        // 上传文件事件
        result = await uploadFile( ctx, {
            fileType: 'album',
            path: serverFilePath
        })
        ctx.body = result
    } else {
        ctx.body = '<h1>404 Not Found</h1>'
    }
})

app.listen(3000, () => {
    console.log('upload async picture is stating at port 3000')
})