import { gql } from '@apollo/client'; 

const CREATE_COUPON = gql`

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

