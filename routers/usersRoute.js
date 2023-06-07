const express = require('express')
const app = express()
const userController = require('../controllers/usersController');
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

app.post('/login', userController.login)

app.post('/register', userController.register)

app.use(authentication)

app.put('/:id', authorization.userAuthorization, userController.updateUser)

app.delete('/:id',authorization.userAuthorization, userController.deleteUser)

module.exports = app