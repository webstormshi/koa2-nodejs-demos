function log( ctx ) {
    console.log(ctx.methods, ctx.header.host + ctx.url)
}

module.exports = function() {
    return function *(next) {
        
        // 执行中间件的操作
        log(this)

        if(next) {
            yield next
        }
    }
}