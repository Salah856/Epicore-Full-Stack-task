
function generateCouponCode(){
    return parseInt(Math.random().toFixed(8).split('.')[1]); 
}

export default generateCouponCode; 