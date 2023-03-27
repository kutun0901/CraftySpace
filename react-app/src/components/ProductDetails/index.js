import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../store/products";
import { addItemToCartThunk } from '../../store/shoppingCartItems';
import './ProductDetails.css'


function ProductDetails() {

    const history = useHistory()
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.singleProduct);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sessionUser = useSelector(state => state.session.user);
    const inCartItems = useSelector(state => state.cart)

    const inCartItemsArr = Object.values(inCartItems)

    useEffect(() => {
        dispatch(getSingleProductThunk(id));
    }, [dispatch, id]);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!sessionUser) return window.alert('Log in required for purchasing this product');

        const inCartQuantity = inCartItemsArr.reduce((total, item) => {
          if (item.product_id === product.id) {
            return total + item.quantity;
          }
          return total;
        }, 0);

        if (inCartQuantity + Number(quantity) > product.quantity) {
          return window.alert('The maximum available quantity for this product is ' + product.quantity);
        }

        const item = {
          user_id: sessionUser.id,
          product_id: product.id,
          quantity: Number(quantity)
        };
        await dispatch(addItemToCartThunk(item));
        history.push('/cart');
      };

    if (!product) {
        return null;
    }

    return (
        <div className="product-detail-wrapper">
            <div className="product-image-review">
                <div className="product-images-container">
                    <div className="thumbnail-images">
                        {product.images?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={product.name}
                                className={index === currentImageIndex ? "active" : ""}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                    <div className="current-image">
                    <img src={product.images?.[currentImageIndex]} alt={product.name} />
                    </div>
                </div>
                <div className="image-navigation">
                    <button onClick={() => setCurrentImageIndex(currentImageIndex - 1)} disabled={currentImageIndex === 0}>Previous</button>
                    <button onClick={() => setCurrentImageIndex(currentImageIndex + 1)} disabled={currentImageIndex === (product.images?.length ?? 0) - 1}>Next</button>
                </div>
            </div>
            <div className="product-detail-container">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
                <form onSubmit={handleAddToCart}>
                    <button type="submit">Add to Cart</button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetails;
