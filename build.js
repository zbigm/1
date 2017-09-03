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

let srcDir = path.join(__dirname, 'src')
let distDir = path.join(__dirname, 'dist')

// let htmlDir = path.join(__dirname, 'src', 'html')
// let htmlTgtDir = path.join(__dirname, 'dist', 'html')
// travDir(htmlDir, file => {
//     let baseName = path.basename(file)
//     let footerPath = path.join(__dirname, 'src', 'html', 'part', 'footer.html')
//     let footerStr = fs.readFileSync(footerPath, 'utf8')
//     let tgtPath = path.join(htmlTgtDir, baseName)
//     let fileStr = fs.readFileSync(file,'utf8')
//     let tgtFileStr = fileStr.replace(/<!--{{footer.html}}-->/, footerStr)
//     fs.writeFileSync(tgtPath, tgtFileStr ,'utf8')
// })

// html
let srcHtmlDir = path.join(srcDir, 'html')
let distHtmlDir = path.join(distDir,'html')
let footerStr = fs.readFileSync(path.join(srcHtmlDir, 'part', 'footer.html'), 'utf8')
fs.readdirSync(srcHtmlDir).forEach( html => {
    let filePath = path.join(srcHtmlDir, html)
    if(fs.statSync(filePath).isFile()){
        let fileStr = fs.readFileSync(filePath, 'utf8')
        let tgtFileStr = fileStr.replace(/<!--{{footer.html}}-->/, footerStr)

        let tgtFile = path.join(distHtmlDir, html)
        fs.writeFileSync(tgtFile, tgtFileStr, 'utf8')
        console.log(html, '\n', filePath, '\n', tgtFile)
    }
})