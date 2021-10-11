const { getCoupon, createCoupon } = new CouponService();

const resolvers = {

    getCoupon: ({ code }) => {
        getCoupon(code);
    },
    createCoupon: ({ couponInput }) => {
        const { code, foodItemName, expiryDate, text } = couponInput;
        createCoupon(code, text, foodItemName, expiryDate);
    },
}

export default resolvers; 
