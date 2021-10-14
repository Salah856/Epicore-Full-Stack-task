import { gql } from '@apollo/client'; 

const REDEEM_COUPON = gql`
    query getCoupon($code: Number!){
        getCoupon(code: $code){
            text
            expiryDate
        }
    }
`; 


export default REDEEM_COUPON; 

