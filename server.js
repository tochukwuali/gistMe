const path = require('path')
const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const connectDB = require('./config/db')
const morgan = require('morgan')
const exphbs = require("express-handlebars")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

//Load Config
dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()

//Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));   
}

// Handlebar helpers
const { formatDate, removeHTMLTags, truncate, editIcon } = require("./helpers/hbs");

// View - Handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      removeHTMLTags,
      truncate,
      editIcon
    },
    defaultLayout: "main",
    extname: ".hbs"
  })
);
app.set('view engine', '.hbs')

// Session
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  })
);

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`The server is running in ${process.env.NODE_ENV} mode on ${PORT}`)
})