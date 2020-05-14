const mongoose = require('mongoose');

const userAddressSchea = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: [{
        fullName: {
            type: String,
            required: true
        },
        mobileNumber: {
            type:Number,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        address: {
            type:String,
            required: true
        },
        cityTownDistrict: {
            type: String,
            required: true
        },
        status: {
            type:String,
            required: true
        },
        landMark: {
            type: String
        },
        alternatePhoneNumber: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('userAddress', userAddressSchea);