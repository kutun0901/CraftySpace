import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getAllCartItemsThunk, updateCartThunk, removeItemThunk } from '../../store/shoppingCartItems';
import './ShoppingCart.css';

const ShoppingCart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => Object.values(state.cart));
  const sessionUser = useSelector(state => state.session.user)
  const cartItemsArr = Object.values(cartItems)

  useEffect(() => {
    dispatch(getAllCartItemsThunk());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to='/' />

  const handleQuantityChange = (item, quantity) => {
    if (quantity <= 0) {
      dispatch(removeItemThunk(item.id));
    } else if (quantity <= item.product.quantity) {
      dispatch(updateCartThunk({ ...item, quantity }));
    } else {
      window.alert("Item is out of stock. Please check back later.");
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemThunk(itemId));
  };

  let total = 0;
  for (const item of cartItemsArr) {
    const singleItemAmount = item.quantity * item.product.price
    total += singleItemAmount
  }


  return (
    <div className='shopping-cart-container'>
      <h2 className='shopping-cart-title'>Shopping cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (<p>{cartItems.length} item(s) in your cart</p>)}

      <div className='cart-items-wrapper'>
        <div className='cart-item-container'>
          <ul>
            {cartItemsArr.map(item => (
              <li key={item.id} className='cart-item'>
                <NavLink to={`/products/${item.product_id}`}>
                  <div className="cart-item-details">
                    <div className='cart-item-image'>
                      <img src={item.product.images.length ? item.product.images[0] : null} alt={item.product.description} />
                    </div>
                    <div className='cart-item-info'>
                      <h4 className='cart-item-name'>{item.product.name}</h4>
                      <p className='cart-item-price'>$ {item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </NavLink>
                <div className='cart-item-quantity'>
                  <label>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                  />
                  <button className='cart-item-remove' onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='items-total-container'>
          <p className='items-total'>Item(s) total: ${total.toFixed(2)}</p>
          <button className='pay-button'>Pay</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
