import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const { name, img, stock, seller, price } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <h4><small>by: {seller}</small></h4>
                <p>${price}</p>
                <p>Only {stock} left in stock - order soon</p>
                <button 
                    className="button"
                    onClick ={() => props.handleProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>
            </div>
        </div>
    );
};

export default Product;