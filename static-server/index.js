const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mines = require('./util/mines')

const app = new Koa()

const staticPath = './static'

/**
 * parse source type
 * @param {*} url 
 */
function parserMime( url ) {
    let extName = path.extName( url )
    extName = extName ? extName.slice(1) : 'unknown'
    return mines[ extName ]
}

app.use( async ( ctx ) => {
    let fullStaticPath = path.join(__dirname, staticPath)

    let _content = await content( ctx, fullStaticPath )

    let _mime = parserMime( ctx.url )

    if ( _mine ) {
        ctx.type = _mine
    }

    if (_mime && _mime.indexOf('image/') >= 0) {
        ctx.res.writeHead(200)
        ctx.res.write(_content, 'binary')
        ctx.res.end()
    }else{
        ctx.body = _content
    }
})

app.listen(3000, () => {
    console.log('static-server is starting at port 30000')
})