import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../store/products";
import { addItemToCartThunk, getAllCartItems } from '../../store/shoppingCartItems';

function ProductDetails () {

    const history = useHistory()
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.singleProduct);
    const [quantity, setQuantity] = useState(1);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSingleProductThunk(id));
    }, [dispatch, id]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!sessionUser) return window.alert('Log in required for purchasing this product')

        const item = {
            user_id: sessionUser.id,
            product_id: product.id,
            quantity: Number(quantity)
        };
        await dispatch(addItemToCartThunk(item));

        history.push('/cart')
    };

    if (!product) {
        return null;
    }

    return (
        <div className="product-detail-wrapper">
            <div className="product-image-review">
                <div className="product-images-container">

                </div>
                <div>Review go here</div>
            </div>
            <div className="product-detail-container">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
                <form onSubmit={handleAddToCart}>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <button type="submit">Add to Cart</button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetails;
