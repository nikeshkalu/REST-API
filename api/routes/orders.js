const express = require('express')
const router = express.Router();
const OrdersController = require('../controllers/controller_order')
const checkAuth = require('../middleware/check-auth')


router.get('/', checkAuth, OrdersController.order_get_all)

router.post('/', checkAuth, OrdersController.order_create_order)

router.get('/:orderId', checkAuth, OrdersController.order_get_order)

router.delete('/:orderId', checkAuth, OrdersController.order_delete_order)

module.exports = router