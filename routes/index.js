const express = require('express')
const router = express.Router()

const indexController = require("./../controller/index")

router.get('/about', indexController.getAbout )
router.get('/home', indexController.getHome)

router.post('/data-backend-ma-janey-bato', indexController.postData)

module.exports= router