const {CouponService} = require('../CouponService/couponService');
const {PubSub} = require('apollo-server'); 
const pubSub = new PubSub();

const { 
    createCoupon, 
    redeemCouponByCode,
    requestCouponByFoodItemName 
} = new CouponService();
  

const resolvers = {
    Query: {
      requestCouponByFoodItem: async (parent, args, context)=>{

        const coupon = requestCouponByFoodItemName(args.foodItemName, args.clientID); 
        return coupon;
    }
  },
  Mutation: {
    createCoupon: async (parent, args, context) => {
      const {code, text, foodItemName, expiryDate} = args; 
      return createCoupon(code, text, foodItemName, expiryDate);

    },
    redeemCoupon: async (parent, args, context) => {

      const coupon = redeemCouponByCode(args.code);
      pubSub.publish('couponRedeemed', { couponRedeemed: coupon });
      return couponRedeemed;
    },
  },
  
  Subscription:{
      couponRedeemed: {
         subscribe: ({code}) => pubsub.asyncIterator(['couponRedeemed']),
      }
  }
}

module.exports = {resolvers}; 

