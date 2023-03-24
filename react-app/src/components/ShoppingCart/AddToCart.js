import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addItemToCartThunk, getAllCartItems } from '../../store/shoppingCartItems';

const AddToCart = ({ item }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    await dispatch(addItemToCartThunk({ ...item, quantity }));
    // await dispatch(getAllCartItems())
    setQuantity(1);
    history.push('/cart');
  };

  return (
    <div>
      <label>Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
