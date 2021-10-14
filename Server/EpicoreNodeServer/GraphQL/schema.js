const {PubSub} = require('apollo-server'); 
const pubSub = new PubSub();
const {CouponService} = require('../CouponService/couponService');
const {makeExecutableSchema} = require('@graphql-tools/schema');

const { createCoupon, getCoupon } = new CouponService();
const {couponRedeemed} = require('./subscriptions');

const typeDefs = `

    input CouponInput {
      text: String
      code: Number
      expiryDate: String
    }

    type Coupon {
      _id: ID
      text: String
      code: Number
      expiryDate: String
    }

    type Query {
      redeemCoupon(code: Number!): Coupon
    }


    type Mutation {
      createCoupon(coupon: CouponInput!): Coupon
    }

    ${couponRedeemed}
    ,

`; 


const resolvers = {
    Query: {
      reedemCoupon: async (parent, args, context) => {

        const coupon = getCoupon(args.code);
        pubSub.publish('couponRedeemed', { couponRedeemed: coupon });
        return couponRedeemed;
    },
  },
  Mutation: {
    reedemCoupon: async (parent, args, context) => {
      const {code, text, foodItemName, expiryDate} = args; 
      return createCoupon(code, text, foodItemName, expiryDate);

    },
  },
  
  Subscription:{
      couponRedeemed:{
         subscribe: () => pubsub.asyncIterator(['couponRedeemed']),
      }
  }
}

const schema = makeExecutableSchema({
  typeDefs, 
  resolvers
}); 


module.exports = {schema}