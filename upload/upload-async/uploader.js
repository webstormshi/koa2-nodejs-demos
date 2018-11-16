const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const os = require('os')
const Busboy = require('busboy')

function mkdirsSync ( dirname ) {
    if ( fs.existsSync( dirname )) {
        return true
    } else {
        if (mkdirsSync( path.dirname(dirname))) {
            fs.mkdirSync( dirname )
            return true
        }
    }
}

function getSuffixName ( dirname ) {
    var nameList = dirname.split('.')
    return nameList[nameList.length - 1]
}

function uploadFileSync( ctx, options ) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({headers: req.headers})

    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    let mkdirresult = mkdirsSync( filePath )

    return new Promise((resolve, reject) => {
        console.log('文件上传中....')
        let result = {
            success: false,
            message: '',
            data: null
        }

        busboy.on('file', function(fieldname, file, filename, encoding, mimeType) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let uploadFilePath = path.join( filePath, fileName )
            let saveTo = path.join(uploadFilePath)

            file.pipe(fs.createWriteStream(saveTo))

            file.on('end', function() {
                result.success = true
                result.message = '文件上传成功！'
                result.data = {
                    pictrueUrl: `//${ctx.host}/image/${fileType}/${fileName}`
                }
                console.log('文件上传成功！')
                resolve(result)
            })
        })

        busboy.on('finish', function() {
            console.log('文件上传结束')
            resolve(result)
        })

        busboy.on('error', function(err){
            console.log('文件上传出错')
            reject(err)
        })

        req.pipe(busboy)
    })
}

module.exports = {
    uploadFileSync
}