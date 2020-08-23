import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product'


const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const [products, setProduct] = useState(first10)
    const [cart, setCart] = useState([])

    const handleProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        handleProduct={handleProduct}
                        product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <h2>this is cart</h2>
            <h4>Order Summary: {cart.length}</h4>
            </div>
            
        </div>
    );
};

export default Shop;