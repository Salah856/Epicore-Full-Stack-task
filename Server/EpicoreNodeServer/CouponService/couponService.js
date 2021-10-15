const Coupon = require('../models/couponSchema'); 
const { v4: uuidv4 } = require('uuid');

class CouponService{
    
    constructor(){

    }

    redeemCouponByCode(code){
        Coupon.find({code: code}).then((res)=>{
            return res;
        }).catch((err) =>{
            console.log(err); 
        }); 
    }

    requestCouponByFoodItemName(foodItemName, clientID){
        Coupon.update(
            {
                foodItemName: foodItemName
            },
            {
                $set: { userID: clientID }
            }).then((res)=>{
                return res; 
            }).catch((err)=>{
                console.log(err)
            })
    }
    
    createCoupon(code, text, foodItemName, expiryDate){

        const coupon = new Coupon({
            _id: uuidv4(),
            code: code, 
            text: text, 
            foodItemName: foodItemName, 
            expiryDate: new Date(expiryDate),
        }); 

        coupon.save()
        .then(result => {
            return result; 
        })
        .catch(err => {
            console.log(err); 
            throw err; 
        }); 
    }
}

module.exports = { CouponService }