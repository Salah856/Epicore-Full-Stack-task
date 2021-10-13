const { getCoupon, createCoupon } = new CouponService();

const resolvers = {

    getCoupon: ({ code }) => {
        getCoupon(code);
    },
    createCoupon: ({ input }) => {
        const { code, foodItemName, expiryDate, text } = input;
        createCoupon(code, text, foodItemName, expiryDate);
    },
}

export default resolvers; 
