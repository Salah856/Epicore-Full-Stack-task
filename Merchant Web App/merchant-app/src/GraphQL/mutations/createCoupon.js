import { gql } from '@apollo/client'; 

const CREATE_COUPON = gql`

    input CouponInput {
        foodItemName: String!
        text: String!
        expiryDate: Date!
        code: Number!
    }

    mutation couponMutation($couponInput: CouponInput!){
        createCoupon(couponInput: $couponInput){
            _id
            code
            text
            foodItemName
            expiryDate
        }
    }
`


export default CREATE_COUPON;

