const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
import CouponService from './CouponService/couponService';
import MongoConnection from './MongoService/mongoConnection';

const { getCoupon, createCoupon } = new CouponService();
const { connect } = new MongoConnection();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({

    schema: buildSchema(`

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
    `),
    rootValue: {
        getCoupon: ({ code }) => {
            getCoupon(code);
        },
        createCoupon: ({ couponInput }) => {
            const { code, foodItemName, expiryDate, text } = couponInput;
            createCoupon(code, text, foodItemName, expiryDate);
        },
    },
    graphiql: true
}))


connect(app);


