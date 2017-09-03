var express = require('express')
var router = express.Router()

var newsDt = require('../data/news_article')

router.get('/', function (req, res) {
    let tag = req.query.tag
    let pageIdx = parseInt(req.query.pageIndex)
    console.log(req.query)

    let news = [1,2,3,4,5].map( function (v) {
        return newsDt
    })
    console.log(typeof pageIdx,pageIdx,'pageIndex')
    res.json({
        hasMore: pageIdx < 3 ? true : false,
        news: pageIdx < 3 ? news : null
    })
})


module.exports = router