import React, { useEffect, useState } from 'react';

import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 15);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] =useState([]);
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey =>{
            const product = fakeData.find(pd=> pd.key ===existingKey);
            product.quantity =savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    },[])







    const handleAddProduct = (product)=>{
        const productAdded = product.key
       const sameProduct = cart.find(prod => prod.key === product.key)
     

        let count = 1;
        let newCart;
       if(sameProduct){
          count = sameProduct.quantity + 1;
           sameProduct.quantity= count;
           const others = cart.filter(prod => prod.key !== productAdded);
           newCart = [...others,sameProduct]
           
       }
       else{
           product.quantity = 1;
           newCart = [...cart, product]

       }
        setCart(newCart);
        addToDatabaseCart(product.key,count)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
             
  {
  products.map(pd => <Product
  key={pd.key}
  showAddToCart={true}
   handleClick ={handleAddProduct}
    product={pd}>
    </Product>)
    }
               
            </div>
            <div className="cart-container">
              <Cart cart={cart}>
              <Link to="/review"> <button className="add-button">Review Order</button></Link>
              </Cart>
            </div>
        </div>
    );
};

export default Shop;