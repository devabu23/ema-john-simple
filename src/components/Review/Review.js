import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../image/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(false)

    const handleplaceOrder = () => {
        setCart([]);
        setOrders(true)
        processOrder()
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product
        })
        setCart(cartProducts)
    }, []);

    let thnkyou;  
    if (orders) {
        thnkyou = <img src={happyImg} alt=".." />
    } 
    
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        product={pd}
                        removeProduct={removeProduct}></ReviewItem>)
                }
                {
                   thnkyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleplaceOrder} className="button">Place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;