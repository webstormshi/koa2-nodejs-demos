const Koa = require('koa')
const app = new Koa()

app.use(async ( ctx ) => {

    // get qs object from ctx
    let url = ctx.request.url
    let req_query = ctx.request.req_query
    let req_querystring = ctx.request.querystring

    // get qs obj from ctx
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000, () => {
    console.log('request get is starting at port 3000')
})