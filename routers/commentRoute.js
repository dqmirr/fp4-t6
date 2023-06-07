const express = require('express')
const app = express()
const commentCtr = require('../controllers/commentController')
const Authorization = require('../middlewares/authorization')

app.get('/', commentCtr.showComment)

app.post('/', commentCtr.AddComment)

//authorization
app.use('/:commentId',Authorization.CommentAuthorization)

app.put('/:commentId', commentCtr.EditComment)

app.delete('/:commentId',commentCtr.DeleteComment)

module.exports = app