var express = require('express')
var router = express.Router()

var tag = require('../data/tag')
var article = require('../data/article')
var video = require('../data/video')
var project = require('../data/project')


router.get('/Tag/GetAll', function (req, res) {
    res.json(tag)
})

router.post('/Mail/SendVerificationCode', function (req, res) {
    res.json({
        Status: 2,
        req: req.body
    })
})



router.get('/Article/Search', function (req, res) {
    let memberId = req.query.memberId
    let articleType = req.query.articleType
    let isRecommend = req.query.isRecommend
    let keyword = req.query.keyword
    let page = parseInt(req.query.page) || 1
    console.log(req.query)

    let articles = [1,2,3,4,5].map( function (v) {
        return article
    })
    res.json({
        hasMore: page < 3 ? true : false,
        articles: page < 3 ? articles : null,
        reqParam: {
            memberId,
            articleType,
            isRecommend,
            keyword,
            page
        }
    })
})

router.get('/Video/Search', function (req, res) {
    let memberId = req.query.memberId
    let videoType = req.query.videoType
    let isRecommend = req.query.isRecommend
    let page = parseInt(req.query.page) || 1
    console.log(req.query)

    let videos = [1,2,3,4,5].map( function (v) {
        return video
    })
    res.json({
        hasMore: page < 3 ? true : false,
        videos: page < 3 ? videos : null,
        reqParam: {
            memberId,
            videoType,
            isRecommend,
            page
        }
    })
})

router.get('/Project/Search', function (req, res) {
    let memberId = req.query.memberId
    let isRecommend = req.query.isRecommend
    let keyword = req.query.keyword
    let page = parseInt(req.query.page) || 1
    console.log(req.query)

    let projects = [1,2,3,4,5].map( function (v) {
        return project
    })
    res.json({
        hasMore: page < 3 ? true : false,
        projects: page < 3 ? projects : null,
        reqParam: {
            memberId,
            isRecommend,
            keyword,
            page
        }
    })
})


module.exports = router