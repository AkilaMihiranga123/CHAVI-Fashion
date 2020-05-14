const mongoose = require('mongoose');

//create order model
const order_schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    order:[{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        },
        price: {
            type: Number,
            required:true
        },
        quantity:{
            type:Number
        }
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId, ref: 'userAddress'
    },
    OrderDate: {
        type: Date,
        default: Date.now()
    },
    paymentType: {
        type: String
    },
    paymentStatus: {
        type: String
    },
    OrderCompletedStatus: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', order_schema);