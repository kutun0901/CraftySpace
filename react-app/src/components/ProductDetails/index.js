import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../store/products";
import AddToCart from "../ShoppingCart/AddToCart";

function ProductDetails () {

    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.singleProduct);

    useEffect(() => {
        dispatch(getSingleProductThunk(id));
    }, [dispatch, id]);

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
                <AddToCart item={product} />
            </div>
        </div>
    );
}

export default ProductDetails;
