const {PubSub} = require('apollo-server'); 
const pubSub = new PubSub();
const {CouponService} = require('../CouponService/couponService');
const {makeExecutableSchema} = require('@graphql-tools/schema');

const { 
  createCoupon, 
  getCouponByCode, 
  getCouponByFoodItemName 
} = new CouponService();

const typeDefs = `

    input CouponInput {
      text: String
      code: Int
      expiryDate: String
    }

    input Code {
      code: Int
    }

    type Merchant {
      _id: ID
      merchantName: String
      coupons: [Coupon]
    }

    type Coupon {
      _id: ID
      text: String
      code: Int
      expiryDate: String
      merchant: Merchant
      userID: String
      requested: Boolean
      redeemed: Boolean
    }

    type Query {
      getCouponByFoodItem(foodItemName: String): Coupon
    }


    type Mutation {
      createCoupon(coupon: CouponInput!): Coupon
      redeemCoupon(code: Int): Coupon
    }

    type Subscription {
      couponRedeemed(code: Code): Coupon
    }
    ,

`; 


const resolvers = {
    Query: {
      getCouponByFoodItem: async (parent, args, context)=>{

        const coupon = getCouponByFoodItemName(args.foodItemName); 
        return coupon;
    }
  },
  Mutation: {
    createCoupon: async (parent, args, context) => {
      const {code, text, foodItemName, expiryDate} = args; 
      return createCoupon(code, text, foodItemName, expiryDate);

    },
    redeemCoupon: async (parent, args, context) => {

      const coupon = getCouponByCode(args.code);
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

const schema = makeExecutableSchema({
  typeDefs, 
  resolvers
}); 


module.exports = {schema}