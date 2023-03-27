import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { Redirect } from 'react-router-dom';
import { deleteReviewThunk, getAllReviewsThunk } from "../../store/reviews";
import { getSingleProductThunk } from "../../store/products";

function DeleteReviewModal({reviewId, productId}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const product = useSelector(state => state.product.singleProduct);

    if (!product) return <Redirect to='/' />

    const deleteHandler = async () => {

        await dispatch(deleteReviewThunk(reviewId))
        await dispatch(getAllReviewsThunk(productId))
        await dispatch(getSingleProductThunk(productId))
        .then(closeModal())
    }

    return (
        <div className="delete-review-container">
          <h3 className="confirm-title">Confirm Delete</h3>
          <p>
          Are you sure you want to delete this review?
          </p>
          <div>
          <button className="yes" onClick={deleteHandler}>Yes (Delete Review)</button>
          </div>
          <div>
          <button className="no" onClick={closeModal}>No (Keep Review)</button>
          </div>
      </div>
    )
}

export default DeleteReviewModal;
