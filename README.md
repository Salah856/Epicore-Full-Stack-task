# Epicore-Full-Stack-task

This App for Epicore Fullstack task (Mobile, Web, Backend)

Technologies used: 

- React, React Native (Frontend)
- NodeJS, Express, GraphQL, MongoDB (Backend, API, Database)

### N.B:

You can find the repo of mobile app here: https://github.com/Salah856/EpicoreMobile


The app covers these steps: 

1. Create 8 digits Codes in the webapp - merchant perspective
2. Open the mobile app and request the code from the coupon (discount button) - end user perspective

3. Put the 8 digits in the webapp app
4. The end user will get the notification with the question.


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

```js
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


