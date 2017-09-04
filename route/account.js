var express = require('express')
var router = express.Router()

var { account, accountDetail }  = require('../data/account')

router.post('/CheckEmail', function (req, res) {
    let email = req.body.email
    res.json({
        Status: 2,
        req: req.body
    })
})

router.post('/Register', function (req, res) {
    res.json({
        Status: 2,
        req: req.body
    })
})

router.post('/Logon', function (req, res) {
    res.json({
        Status: 2,
        req: req.body
    })
})

router.post('/Logout', function (req, res) {
    res.json({
        Status: 2,
        req: req.body
    })
})

router.get('/GetLogonStatus', function (req, res) {
    res.json({
        Status: 2,
    })
})

router.post('/ResetPassword', (req, res) => {
    res.json({
        Status: 2,
        req: req.body
    })
})

router.post('/Search', function (req, res) {
    // let memberType = req.query.memberType
    // let memberLevel = req.query.memberLevel
    // let keyword = req.query.keyword
    // let tagId = req.query.tagId
    let page = parseInt(req.body.p) || 1

    let accounts = [1,2,3,4,5].map( function (v) {
        return account
    })
    res.json({
        Status: 2,
        hasMore: page < 3 ? true : false,
        Body: page < 3 ? accounts : null,
        accounts: page < 3 ? accounts : null,
        req: req.body
    })
})

router.get('/Detail/:id', function (req, res) {
    let memberId = req.params.memberId

    res.json({
        accountDetail,
        req: {
            memberId: memberId
        }
    })
})


module.exports = router