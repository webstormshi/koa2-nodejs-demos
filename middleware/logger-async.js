
function log( ctx ) {
    console.log('cdfg', ctx.methods, ctx.header.host + ctx.url)
}

module.exports = function() {
    return async function(ctx, next) {
        
        // 执行中间件的操作
        log(ctx)

        if(next) {
            await next()
        }
    }
}