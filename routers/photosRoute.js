const express = require('express')
const app = express.Router()
const PhotoController = require('../controllers/photosController')
const Authorization = require('../middlewares/authorization')

app.post('/', PhotoController.createPhoto)
app.get('/', PhotoController.getPhotos)

//authorization
app.use('/:photoId',Authorization.PhotoAuthorization)

app.put('/:photoId', PhotoController.updatePhotoById)
app.delete('/:photoId', PhotoController.deletePhotoById)

module.exports = app