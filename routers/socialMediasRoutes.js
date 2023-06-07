const express = require('express')
const app = express()
const SosMedController = require('../controllers/sosmedController')
const Authorization = require('../middlewares/authorization')

app.get('/', SosMedController.GetAllSocialMedia)

app.post('/', SosMedController.AddSocialMedia)

//authorization
app.use('/:socialMediaId',Authorization.SocialMediaAuthorization)

app.put('/:socialMediaId', SosMedController.EditSocialMedia)

app.delete('/:socialMediaId', SosMedController.DeleteSocialMedia)

module.exports = app