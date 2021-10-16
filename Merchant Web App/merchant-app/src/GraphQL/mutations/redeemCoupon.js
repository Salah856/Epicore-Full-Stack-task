import { gql } from '@apollo/client'; 

const REDEEM_COUPON = gql`
    mutation RedeemCoupon($code: Int!){
        redeemCoupon(code: $code){
            text
            expiryDate
            clientID
        }
    }
`; 


export default REDEEM_COUPON; 

