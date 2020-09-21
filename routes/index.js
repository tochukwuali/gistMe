const express = require("express")
const Router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const Story = require("../models/Story")

// @desc Login/Landing Page
// @route GET /
Router.get('/', ensureGuest, (req, res) => {
    res.render('Login', {
      layout: 'login'
    })
})

// @desc Dasboard Page
// @route GET /dashboard
Router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({user: req.user.id}).lean()

     res.render("Dashboard", {
       name: req.user.firstName,
       stories
     });
  } catch (error) {
    console.log(error)
    res.render("error/500")
  }
});


module.exports = Router;