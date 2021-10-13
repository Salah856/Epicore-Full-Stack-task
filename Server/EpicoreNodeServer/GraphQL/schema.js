import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";

import CouponTypes from "./types";
import CouponQueries from "./queries";
import CouponMutations from "./mutations";
import CouponSubscriptions from './subscriptions';


const schema = {
  typeDefs: gql`
    ${CouponTypes}

    type Query {
      redeemCoupon(code: Number!): Coupon
    }

    type Mutation {
      createCoupon(coupon: CouponInput!): Coupon
    }

    ${CouponSubscriptions}
  `,
  resolvers: {
    Query: {
      ...CouponQueries,
    },
    Mutation: {
      ...CouponMutations,
    },
    Subscription:{
        couponRedeemed:{
            subscribe: () => pubsub.asyncIterator(['couponRedeemed']),
        }
    }
  },
};

export default makeExecutableSchema(schema);