const  express = require('express');
const router =express.Router();
const mongoose = require('mongoose');
const order = require('../models/Order');
const cartItem = require('../models/cartItem');
const userAddress = require('../models/userAddress');

//create order route
router.post('/create', (req, res, next) => {

    //create new order
    const order = new order({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        order: req.body.order,
        address: req.body.address,
        paymentType: req.body.paymentType,
        paymentStatus: req.body.paymentStatus
    });

    //save the order
    order.save().then(order =>{
        cartItem.remove({"user": req.body.user}).exec().then(doc => {
            res.status(201).json({
                message: order
            });
        }).catch(error => {
            res.status(500).json({
                error:error
            });
        })
    }).catch(error => {
        res.status(500).json({
            error:error
        });
    })
});

router.get('/getorders/:userId', (req, res, next) =>{
    const userId = req.params.userId;
    order.find({"user": userId}).select('address order orderDate paymentType paymentStatus OrderCompletedStatus').populate('order.product', 'name productPic').exec().then(orders =>{
        userAddress.findOne({"user": userId}).exec().then(userAddress =>{
            const order_With_Address = orders.map(order => {
                return{
                    _id: order._id,
                    order: order.order,
                    address: order.address,
                    orderDate: order.orderDate,
                    paymentType: order.paymentType,
                    paymentStatus: order.paymentStatus,
                    OrderCompletedStatus: order.OrderCompletedStatus
                }
            });res.status(200).json({
                message: order_With_Address
            });
        }).catch(error => {
            return res.status(500).json({
                error:error
            })
        })
    }).catch(error => {
        res.status(500).json({
            error:error
        });
    });
});

module.exports = router;
