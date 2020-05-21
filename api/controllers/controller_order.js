const Order = require('../models/order')
const Product = require('../models/product')
const mongoose = require('mongoose')

exports.order_get_all = (req, res, next) => {
    Order.find().select('productId quantity _id')
        .populate('productId', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        productId: doc.productId,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })

            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.order_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    messsage: 'Product not found',
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                productId: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "Order Stored",
                createdOrder: {
                    _id: result._id,
                    productId: result.productId,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })


}

exports.order_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('productId')
        .exec().then(orders => {
            if (!orders) {
                res.status(404).json({
                    message: 'Order not found'
                })
            } else {
                res.status(200).json({
                    order: orders,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/'
                    }
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}

exports.order_delete_order = (req, res, next) => {
    orderId = req.params.orderId
    Order.findById(orderId).exec().then(orders => {
        if (!orders) {
            res.status(404).json({
                message: 'Order not found with given Id'
            })
        } else {
            Order.remove({ _id: orderId })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "order Deleted",
                        request: {
                            type: 'POST',
                            url: 'http://localhost:3000/orders/',
                            body: {
                                productId: 'ID',
                                quantity: 'Number'
                            }
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })

        }
    })

}