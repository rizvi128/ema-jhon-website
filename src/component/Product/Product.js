import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import {Link } from 'react-router-dom'

const Product = (props) => {
    
    const { img, name, seller, price, stock, key } = props.product;

    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={"/Product/"+key}>{name}</Link></h4>
                <p><small>by{seller}</small></p>
                <br />
                <h3>${price}</h3>
                <br />
                <p><small> only{stock} left in stock -order soon</small></p>
                {props.showAddToCart === true&& 
                <button className='add-button' onClick={()=>props.handleClick(props.product)}><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;