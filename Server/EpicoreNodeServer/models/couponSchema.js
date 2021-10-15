const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const couponSchema = new Schema({

    text: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    foodItemName: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }, 
    userID: {
        type: String,
        default: null
    }, 
    requested: {
        type: Boolean, 
        default: false
    }, 
    redeemed:{
        type: Boolean, 
        default: false
    }

}); 

const couponModel = mongoose.model('Coupon', couponSchema); 


