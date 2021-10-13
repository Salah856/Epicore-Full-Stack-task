
const CouponFields = `
    text: String
    code: Number
    expiryDate: Date
`;

export default `
    type Coupon {
        _id: ID
        ${CouponFields}
    }



    input CouponInput {
        ${CouponFields}
    }
`;