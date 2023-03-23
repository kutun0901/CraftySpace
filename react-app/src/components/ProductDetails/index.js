import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../store/products";


function ProductDetails () {

    const { id } = useParams();
    console.log('id:', id);
    console.log('useParams:', useParams());
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.singleProduct);


    useEffect(() => {
        dispatch(getSingleProductThunk(id));
    }, [dispatch, id]);

    if (!product) {
        return <p>Loading...</p>;
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
            </div>
        </div>
    );
}

export default ProductDetails;
