
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
      getCouponByFoodItem(foodItemName: String, clientID: String): Coupon
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

module.exports = {typeDefs}; 