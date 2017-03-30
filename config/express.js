const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')

module.exports = (app, config) => {
  //View engine setup.
  app.set('views', path.join(config.rootFolder, '/views'))
  app.set('view engine', 'hbs')

  //Parser request
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  //Cookies
  app.use(cookieParser())

  //Session
  app.use(session({secret: 's3crt5tr1ng', resave: false, saveUninitialized: false}))

  //Passport - validation module
  app.use(passport.initialize())
  app.use(passport.session())


  //Public folder
  app.use(express.static(path.join(config.rootFolder, 'public')))

}
