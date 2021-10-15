# Epicore-Full-Stack-task

This App for Epicore Fullstack task (Mobile, Web, Backend)

Technologies used: 

- React, React Native (Frontend)
- NodeJS, Express, GraphQL, MongoDB (Backend, API, Database)


The app covers these steps: 

1. Create 8 digits Codes in the webapp - merchant perspective
2. Open the mobile app and request the code from the coupon (discount button) - end user perspective

3. Put the 8 digits in the webapp app
4. The end user will get the notification with the question.


The schema architecture is built on assuming that merchant has many coupons that he can create and coupon has many users as the same offer can be sent to many clients 

You can find the schema easily from './Server/EpicoreNodeServer/GraphQL/schema'

Here is a snapshot from the typeDefs: 

```gql

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

```

CouponSchema in MongoDB: 

```json
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

```

