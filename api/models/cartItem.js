const mongoose  = require('mongoose');

const cartItemSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            quantity: { type:Number, default: 1 },
            price: Number,
            total: Number
        }
    ]
},{
    timestamps: true,
});

module.exports = mongoose.model('CartItem', cartItemSchema);