var express = require('express')
var router = express.Router()

var article = require('../data/news_article')
var video = require('../data/news_video')

router.get('/', function (req, res) {
    let type = req.query.type
    let tag = req.query.tag
    let page = parseInt(req.query.page)
    console.log(req.query)

    let news = [1,2,3,4,5].map( function (v) {
        return type == 'article' ? article : video
    })
    res.json({
        hasMore: page < 3 ? true : false,
        news: page < 3 ? news : null
    })
})


module.exports = router