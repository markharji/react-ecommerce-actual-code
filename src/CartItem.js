import React from 'react'
import './CartItem.css'
export default function CartItem({cartItem,removeCartItem}) {

    const handleRemoveItem = () => {
        removeCartItem(cartItem)
    }

    return (
        <> 
        <div className="cart-header"><button className="remove-btn" onClick={handleRemoveItem}>X</button></div>
            <div className="cart">
                <div className="cart-face" style={{fontSize:cartItem.size}}>{cartItem.face}</div>
                <div className="cart-details">
                    <div className="cart-name">{cartItem.name}</div>
                    <div className="cart-price">Price: ${cartItem.price}</div>
                    <div className="cart-date">Date: {cartItem.submitDate}</div>
                </div>
            </div>
        </>
    )
}
