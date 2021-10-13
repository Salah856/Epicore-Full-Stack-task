
import {PubSub} from 'apollo-server'; 

const pubSub = new PubSub();


import CouponService from "../CouponService/couponService";

const { getCoupon } = new CouponService();

export default {
    reedemCoupon: async (parent, { code }, context) => {

        const coupon = getCoupon(code); 
        pubSub.publish('couponRedeemed', {couponRedeemed: coupon});
        return couponRedeemed; 
    },
};
