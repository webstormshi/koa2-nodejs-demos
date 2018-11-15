var Koa = require('koa')
var app = new Koa()
var fs = require('fs')

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./views/${page}`
        console.log('viewUrl', viewUrl)
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if(err) {
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

/**
 * 路由
 * @param {string} url 访问地址
 * @return {string} html 返回页面
 */
async function route(url) {
    let view = '404.html'
    switch (url) {
        case '/':
            view = 'index.html'
            break;
        case '/index':
            view = 'index.html'
            break;
        case '/404':
            view = '404.html'
            break;
        default:
            break;
    }
    let html = await render( view )
    return html
}

app.use( async ( ctx ) => {
    let url = ctx.request.url
    console.log('url', url)
    let html = await route( url )
    ctx.body = html
})

app.listen(3000, () => {
    console.log('router-simple is satrting at port 3000')
})