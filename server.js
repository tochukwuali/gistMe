const path = require('path')
const express = require("express");
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require("express-handlebars")
const passport = require("passport")
const session = require("express-session")

//Load Config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));   
}

// View - Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// Session
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Static
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`The server is running in ${process.env.NODE_ENV} mode on ${PORT}`)
})