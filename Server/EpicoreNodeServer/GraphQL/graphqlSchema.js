const { buildSchema } = require('graphql');


const epicoreGraphQLSchema = buildSchema(`

        type Coupon {
        _id: ID!
        foodItemName: String!
        text: String!
        expiryDate: Date!
        code: Number!
        }

        input CouponInput {
            foodItemName: String!
            text: String!
            expiryDate: Date!
            code: Number!
        }

        type couponQuery {
            getCoupon(code: Number!): Coupon!
            getCoupons: [Coupon!]!
        }

        type couponMutation {
            createCoupon(couponInput: CouponInput!): Coupon!
        }

        schema {
            query: couponQuery
            mutation: couponMutation
        }
`); 

export default epicoreGraphQLSchema; 