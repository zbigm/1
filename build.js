const fs = require('fs')
const fse = require('fs-extra')
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
        // console.log(html, '\n', filePath, '\n', tgtFile)
    }
})


// js
let srcJsDir = path.join(srcDir, "Scripts")
let distJsDir = path.join(distDir, "Scripts")
fse.copySync(srcJsDir, distJsDir)

// css
let srcCssDir = path.join(srcDir, "Styles")
let distCssDir = path.join(distDir, "Styles")
fse.copySync(srcCssDir, distCssDir)

// img
let srcImgDir = path.join(srcDir, "Images")
let distImgDir = path.join(distDir, "Images")
fse.copySync(srcImgDir, distImgDir)