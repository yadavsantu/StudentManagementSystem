const express = require('express');
const routes =  express.Router();

//calling the controller
const authController = require('./../controller/auth/auth')


routes.get('/register', authController.getRegister  )
routes.get('/login', authController.getLogin )

routes.post('/register', authController.postRegister )
routes.post('/login', authController.postLogin )

module.exports = routes;