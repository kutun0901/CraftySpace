import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCartItemsThunk, updateCartThunk, removeItemThunk } from '../../store/shoppingCartItems';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => Object.values(state.cart));

  const cartItemsArr = Object.values(cartItems)

  useEffect(() => {
    dispatch(getAllCartItemsThunk());
  }, [dispatch]);

  const handleQuantityChange = (item, quantity) => {
    dispatch(updateCartThunk({ ...item, quantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemThunk(itemId));
  };

  return (
    <div>
      <h2>Shopping cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItemsArr.map(item => (
            <li key={item.id}>
              <span>{item.product.name}</span>
              <span>{item.product.price}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
              />
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
