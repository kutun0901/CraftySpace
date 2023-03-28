import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleProductThunk } from "../../store/products";
import { deleteReviewThunk } from "../../store/reviews";
// import { getSingleProductThunk } from "../../store/products";

function DeleteReviewModal({ review }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([]);

    const deleteHandler = async () => {
        const data = await dispatch(deleteReviewThunk(review))
        if (data) {
            setErrors(data);
        } else {
            dispatch(getSingleProductThunk(review.productId))
            closeModal()
        }
    }

    return (
        <div className="delete-review-container">
            <h3 className="confirm-title">Confirm Delete</h3>
            <p>
                Are you sure you want to delete this review?
            </p>
            <ul className="delete_errors_list">
                {errors.map((error,idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div>
                <button className="no" onClick={closeModal}>Cancel</button>
            </div>
            <div>
                <button className="yes" onClick={deleteHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
