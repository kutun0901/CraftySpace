import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './CompleteOrder.css';
import { Redirect } from 'react-router-dom';
import shoppingCart from "../../asset/Screen Shot 2023-05-04 at 2.43.29 PM.png"


function CompleteOrder() {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return <Redirect to='/' />

    return (
        <div className="complete-order-container">
            <h2 className="complete-order-title">Thank you for your order!</h2>
            <img className='complete-order-image' src={shoppingCart} alt='Complete-Order'></img>
            <p className="complete-order-text">Your payment has been processed and your order is being prepared for shipment.</p>
            <p className="complete-order-text">We'll send you an email with tracking information as soon as your order ships.</p>
            <p className="complete-order-note">Note: This is not a real e-commerce site, so payment has not actually been implemented.</p>
            <NavLink to='/' className='complete-order-link'>Continue shopping</NavLink>
        </div>
    );
}

export default CompleteOrder;
