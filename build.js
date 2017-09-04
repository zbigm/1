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
let distHtmlDir = path.join(distDir,'')
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

function joinFile(paths, dilm) {
    let strs = paths.map(path => {
        return fs.readFileSync(path, 'utf8')
    })
    return strs.join(dilm)
}

// js
// let srcJsDir = path.join(srcDir, "Scripts")
// let distJsDir = path.join(distDir, "Scripts")
// fse.copySync(srcJsDir, distJsDir)

let jq = path.join(srcDir, 'Scripts/lib/jquery-3.2.1.min.js')
let dropload = path.join(srcDir, 'Scripts/lib/dropload.min.js')
let swiper = path.join(srcDir,'Scripts/lib/swiper/js/swiper-3.4.2.min.js')
let vendorjs = path.join(distDir, 'public/Scripts/vendor.min.js')
fs.writeFileSync(vendorjs, joinFile([jq,dropload, swiper],';\n'), 'utf8')

// let initjs = path.join(srcDir, 'Scripts/init.js')
// let tgtInitjs = path.join(distDir, 'Scripts/init.js')
// fs.writeFileSync(tgtInitjs,fs.readFileSync(initjs))

let mainjs = path.join(srcDir, 'Scripts/main.js')
let tgtMainjs = path.join(distDir, 'public/Scripts/main.js')
fs.writeFileSync(tgtMainjs,fs.readFileSync(mainjs))

// css
// let srcCssDir = path.join(srcDir, "Styles")
// let distCssDir = path.join(distDir, "Styles")
// fse.copySync(srcCssDir, distCssDir)

let bootstrapcss = path.join(srcDir,'Styles/lib/bootstrap/css/bootstrap.min.css')
let swipecss = path.join(srcDir,'Styles/lib/swiper/css/swiper-3.4.2.min.css')
let droploadcss = path.join(srcDir,'Styles/lib/dropload.css')
let vendercss = path.join(distDir, 'public/Styles/css/vendor.min.css')
fs.writeFileSync(vendercss, joinFile([bootstrapcss,swipecss,droploadcss],''), 'utf8')

let srcmaincss = path.join(srcDir, 'Styles/main.css')
let indexcss = path.join(srcDir, 'Styles/index.css')
let personcss = path.join(srcDir, 'Styles/person.css')
let newscss = path.join(srcDir, 'Styles/news.css')
let membercss = path.join(srcDir, 'Styles/member.css')
let distMaincss = path.join(distDir, 'public/Styles/main.css')
fs.writeFileSync(distMaincss,joinFile([srcmaincss,indexcss,personcss,newscss,membercss],''),'utf8')


// img
let srcImgDir = path.join(srcDir, "Images")
let distImgDir = path.join(distDir, "public/Images")
fse.copySync(srcImgDir, distImgDir)