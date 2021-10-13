import { gql } from '@apollo/client'; 

const CREATE_COUPON = gql`

    input CouponInput {
        foodItemName: String!
        text: String!
        expiryDate: Date!
        code: Number!
    }

    mutation couponMutation($input: CouponInput!){
        createCoupon(input: $input){
            _id
            code
            text
            foodItemName
            expiryDate
        }
    }
`


export default CREATE_COUPON;

