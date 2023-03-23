import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSingleProductThunk } from "../../store/products";

function ProductDetails () {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.singleProduct)

    useEffect(() => {
        dispatch(getSingleProductThunk())
    }, [dispatch])

    return (

        <div className="product-detail-wrapper">
            <div className="product-image-review">
                <div className="product-images-conatainer">

                </div>
                <div>Review go here</div>
            </div>
            <div className="product-detail-container">

            </div>
        </div>

    )
}
