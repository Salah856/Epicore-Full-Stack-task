import CouponService from "../CouponService/couponService";

const { createCoupon } = new CouponService();

export default {
    reedemCoupon: async (parent, args, context) => {
        const {code, text, foodItemName, expiryDate} = args; 
        return createCoupon(code, text, foodItemName, expiryDate);
    
    },
};

