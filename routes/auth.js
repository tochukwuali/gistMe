const express = require("express");
const passport = require("passport")
const Router = express.Router();

// @desc Auth with Google
// @route GET /auth/google
Router.get("/google", passport.authenticate('google', { scope: ['profile'] }));

// @desc Google Auth Callback
// @route GET /auth/google/callback
Router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect("/dashboard");
});

// @desc Logout
// @route GET 
Router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = Router;
