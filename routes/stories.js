const express = require("express")
const Router = express.Router()
const { ensureAuth } = require("../middleware/auth")

const Story = require("../models/Story")

// @desc Show add page
// @route GET /stories/add
Router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// @desc process add Form
// @route POST /stories
Router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send('errors/500')
    }
})

// @desc Show all stories
// @route GET /stories
Router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('stories/index', {
            stories
        })
    } catch (error) {
        console.log(error)
        res.render('errors/500')
    }
})

module.exports = Router