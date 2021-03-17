import React from 'react';

const Cart = (props) => {
    const cart =props.cart;
    const totalPrice =(cart.reduce((totalPrice,prd)=>totalPrice +prd.price,0))

let shipping = 0;
if(totalPrice >30){
    shipping = 0;
}
else if(totalPrice >0){
    shipping = 12;
}
const tax = (totalPrice* 0.1).toFixed(2);
const grandTotal = totalPrice + shipping + Number(tax);
    return (
        <div>
            <h1>order Summary</h1>
            <p>Items Order :{cart.length}</p>
            <p>Product Price:{totalPrice}</p>
            <p><small>Shipping Charge{shipping}</small></p>
            <p><small>Tax + VAT : {tax}</small></p>
            <p>Total Price :{grandTotal}</p>
        </div>
    );
};

export default Cart;