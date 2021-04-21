import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] =useState([]);
    const [placeOrder, setPlaceOrder] = useState(false);
    const history = useHistory()


    const handleProceedCheckOut=()=> {
        history.push('/shipment');
      
    }


    const removeProduct =(productKey)=>{
        console.log('remove clicked',productKey)
        const newCart = cart.filter(pd=>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        
     const savedCart =getDatabaseCart() 
     const productKeys = Object.keys(savedCart);
     const cartProducts = productKeys.map(key =>{
     const product = fakeData.find(pd=>pd.key ===key);
     product.quantity =savedCart[key];
     return product;
     }) 
     setCart(cartProducts);
    },[])


    let complete;
    if(placeOrder){
         complete = <img src={image} alt=""/>
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            {
                complete
            }

            {
               cart.map(pd =>  
              
               <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
           }
            </div>
           
            <div className="cart-container">
                <Cart cart={cart}>
                </Cart>
                <button onClick={handleProceedCheckOut} className='add-button'>Proceed checkout</button>
            </div>
           
          
        </div>
    );
};

export default Review;