import { gql } from '@apollo/client'; 

const CREATE_COUPON = gql`

    mutation couponMutation($foodItemName: String, $expiryDate: String, $text: String, $code: Int){
        createCoupon(foodItemName: $foodItemName, expiryDate: $expiryDate, text: $text, code: $code){
            _id
            code
            text
            foodItemName
            expiryDate
            clientID
        }
    }
`


export default CREATE_COUPON;

