const fs = require('fs')
const path = require('path')


function travDir(dir, cb) {
    fs.readdirSync(dir).forEach( file => {
        let filePath = path.join(dir, file)
        if(fs.statSync(filePath).isFile()){
            cb(filePath)
        }
    })
}

// copy images
let imgDir = path.join(__dirname,'src','images')
let htmlDir = path.join(__dirname, 'src', 'html')
let htmlTgtDir = path.join(__dirname, 'dist', 'html')
travDir(htmlDir, file => {
    let baseName = path.basename(file)
    let footerPath = path.join(__dirname, 'src', 'html', 'part', 'footer.html')
    let footerStr = fs.readFileSync(footerPath, 'utf8')
    let tgtPath = path.join(htmlTgtDir, baseName)
    let fileStr = fs.readFileSync(file,'utf8')
    let tgtFileStr = fileStr.replace(/<!--{{footer.html}}-->/, footerStr)
    fs.writeFileSync(tgtPath, tgtFileStr ,'utf8')
})

