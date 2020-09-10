import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, key, img, price } = props.product
    const styleItem = {
        borderBottom: '1px solid gray',
        display: 'flex',
        paddingBottom: '10px',
        padding: '20px',
        color: 'blue',
    }
    return (
        <div style={styleItem}>
            <div style={{ marginRight: '15px' }}>
                <img src={img} alt="" />
            </div>
            <div>
                <h2>{name}</h2>
                <h3>${price}</h3>

                <h3>Quantity: {quantity}</h3>
                <button
                    className="button"
                    onClick={() => props.removeProduct(key)}
                >Remove</button>
            </div>

        </div>
    );
};

export default ReviewItem;