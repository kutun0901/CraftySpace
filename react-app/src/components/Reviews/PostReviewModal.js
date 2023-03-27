import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleProductThunk } from "../../store/products";
import { createReviewThunk, getAllReviewsThunk } from "../../store/reviews";

function PostReviewModal({ productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [comment, setComment] = useState("");
    const [star, setStar] = useState(0);
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

        const payload = { rating: star, comment };
        const newReview = await dispatch(createReviewThunk(payload, spotId))
        await dispatch(getAllReviewsThunk(spotId));
        await dispatch(getSingleProductThunk(spotId))

        if (newReview) {
            closeModal();
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
                    value={review}
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
                    Submit Your Review
                </button>
            </div>
        </div>
    );
}

export default PostReviewModal;
