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
    }

}); 

const couponModel = mongoose.model('Coupon', couponSchema); 


