var express = require('express')
var router = express.Router()

var member = require('../data/member')
var detail = require('../data/member_detail')


router.get('/:MemberLevel', function (req, res) {
    let MemberLevel = req.params.MemberLevel
    let tag = req.query.tag
    let page = parseInt(req.query.page) || 1

    let members = [1,2,3,4,5].map(function (v) {
        return member
    })

    res.json({
        hasMore: page < 3 ? true : false,
        members: page < 3 ? members : null,
        reqParam: {
            MemberLevel,
            tag,
            page
        }
    })
})

router.get('/Detail/:memberId', function (req, res) {
    let memberId = req.params.memberId

    res.json({
        detail: detail,
        reqParam: {
            memberId
        }
    })
})



module.exports = router