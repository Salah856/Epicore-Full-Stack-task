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

    type User {
      _id: ID
      userName: String
      coupons: [Coupon]
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
      users: [User] 
    }

    type Query {
      redeemCoupon(code: Int): Coupon
      getCouponByFoodItem(foodItemName: String): Coupon
    }


    type Mutation {
      createCoupon(coupon: CouponInput!): Coupon
    }

    type Subscription {
      couponRedeemed(code: Code): Coupon
    }
    ,

`; 


const resolvers = {
    Query: {
      redeemCoupon: async (parent, args, context) => {

        const coupon = getCouponByCode(args.code);
        pubSub.publish('couponRedeemed', { couponRedeemed: coupon });
        return couponRedeemed;
    },
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