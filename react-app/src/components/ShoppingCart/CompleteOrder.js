import React from 'react';
import './CompleteOrder.css';

function CompleteOrder() {
  return (
    <div className="complete-order-container">
      <h2 className="complete-order-title">Thank you for your order!</h2>
      <p className="complete-order-text">Your payment has been processed and your order is being prepared for shipment.</p>
      <p className="complete-order-text">We'll send you an email with tracking information as soon as your order ships.</p>
      <p className="complete-order-note">Note: This is not a real e-commerce site, so payment has not actually been implemented.</p>
    </div>
  );
}

export default CompleteOrder;
