const express = require("express")
const Router = express.Router()

// @desc Login/Landing Page
// @route GET /

Router.get('/', (req, res) => {
    res.render('Login', {
      layout: 'login'
    })
})

// @desc Dasboard Page
// @route GET /dashboard

Router.get("/dashboard", (req, res) => {
  res.render("Dashboard");
});


module.exports = Router;