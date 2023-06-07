const express = require('express')
const app = express()
const users = require('./usersRoute')
const photos = require('./photosRoute')
const comments = require('./commentRoute')
const socialmedias = require('./socialMediasRoutes')
const authentication = require("../middlewares/authentication")

app.use('/users', users)
app.use(authentication)
app.use('/photos', photos)
app.use('/comments',comments)
app.use('/socialmedias', socialmedias)

module.exports = app