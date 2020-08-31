import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key } = props.product
    const styleItem = {
        borderBottom: '1px solid gray',
        paddingBottom: '10px',
        padding: '20px',
        marginLeft: '200px'
    }
    return (
        <div style={styleItem}>
            <h2 className="product-name">{name}</h2>
            <h3>{quantity}</h3>
            <button 
                className="button"
                onClick={() => props.removeProduct(key)}
                >Remove</button>
                
        </div>
    );
};

export default ReviewItem;