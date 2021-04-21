
import React from 'react';


const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity,key, price} =props.product;
  
    const ItemStyle = {
        borderBottom : '5px solid gray',
        marginBottom :'100px',
        marginLeft : '200px'
    }
    return (
        <div style={ItemStyle} className="Item">
            <h1 className="product-name">{name}</h1>
            <p>Quantity  :{quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={() =>props.removeProduct(key)}  className="add-button">Remove</button>
            
        </div>
    );
};

export default ReviewItem;