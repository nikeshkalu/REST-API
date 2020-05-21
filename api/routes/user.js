const express = require('express')
const router = express.Router();
// const Order = require('../models/order')
// const Product = require('../models/product')
const userController = require('../controllers/controller_user')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', userController.user_signup)

router.post('/login', userController.user_login)

router.delete('/:userId', checkAuth, userController.user_delete)

module.exports = router