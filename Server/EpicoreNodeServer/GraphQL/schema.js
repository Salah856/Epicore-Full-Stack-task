const {PubSub} = require('apollo-server'); 
const pubSub = new PubSub();
const {CouponService} = require('../CouponService/couponService');
const {makeExecutableSchema} = require('@graphql-tools/schema');

const { createCoupon, getCoupon } = new CouponService();

const typeDefs = `

    input CouponInput {
      text: String
      code: Int
      expiryDate: String
    }

    input Code {
      code: Int
    }
    type Coupon {
      _id: ID
      text: String
      code: Int
      expiryDate: String
    }

    type Query {
      redeemCoupon(code: Int): Coupon
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

        const coupon = getCoupon(args.code);
        pubSub.publish('couponRedeemed', { couponRedeemed: coupon });
        return couponRedeemed;
    },
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