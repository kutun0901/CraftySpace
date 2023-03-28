import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleProductThunk } from "../../store/products";
// import { getSingleProductThunk } from "../../store/products";
import { createReviewThunk, updateReviewThunk } from "../../store/reviews";
import "./PostReviewModal.css"


function PostReviewModal({ productId, reviewId }) {

    const reviewToUpdate = useSelector(state => state.reviews[productId].find(review => review.id === reviewId))
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [comment, setComment] = useState(reviewToUpdate ? reviewToUpdate.comment : "");
    const [star, setStar] = useState(reviewToUpdate ? reviewToUpdate.rating : 0);
    const [hover, setHover] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const error = [];
        if (comment.length < 10) error.push("Comment needs to be at least 10 characters");
        if (star === 0) error.push("Please choose a valid rating");

        setValidationErrors(error);
    }, [comment, star]);

    const postHandler = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return alert("Sorry! Check your form again");

        let data;
        const payload = { rating: star, comment };
        if (reviewToUpdate) {
            reviewToUpdate.comment = comment;
            reviewToUpdate.rating = star;
            data = await dispatch(updateReviewThunk(reviewToUpdate))
        } else {
            data = await dispatch(createReviewThunk(productId, payload))
        }
        // console.log("==============", data);
        dispatch(getSingleProductThunk(productId))
        if (data) {
            setValidationErrors(data)
        } else {
            closeModal()
        }
    };

    return (
        <div className="post-review-container">
            <h3 className="confirm-title">Tell us about this product:</h3>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <textarea
                    required
                    type="text"
                    className="comment-input"
                    placeholder="Leave your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                    const starClass =
                        index < hover || index < star ? "on" : "off";
                    return (
                        <button
                            type="button"
                            key={index}
                            className={`rating-button ${starClass}`}
                            onClick={() => setStar(index + 1)}
                            onMouseEnter={() => setHover(index + 1)}
                            onMouseLeave={() => setHover(star)}
                        >
                            <i className="star fas fa-star enlarge"></i>
                        </button>
                    );
                })}
                <span>Stars</span>
            </div>
            <div>
                <button onClick={postHandler} type="submit" disabled={validationErrors.length > 0}>
                    {!!reviewToUpdate ? "Update review" : "Submit review"}
                </button>
            </div>
        </div>
    );
}

export default PostReviewModal;
