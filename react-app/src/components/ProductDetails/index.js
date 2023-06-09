import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleProductThunk } from "../../store/products";
import { getAllReviewsThunk } from "../../store/reviews";
import { addItemToCartThunk, getAllCartItemsThunk } from '../../store/shoppingCartItems';
import './ProductDetails.css'
import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from "../Reviews/DeleteReviewModal";
import PostReviewModal from "../Reviews/PostReviewModal";
import Loading from "../Loading";
import PageNotFound from "../404Page";
import LoginFormModal from "../LoginFormModal"


function ProductDetails() {

    const history = useHistory()
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.singleProduct);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sessionUser = useSelector(state => state.session.user);
    const inCartItems = useSelector(state => state.cart)
    const reviews = useSelector(state => state.reviews[id]);
    const [isLoaded, setIsLoaded] = useState(false)


    const inCartItemsArr = Object.values(inCartItems)

    useEffect(() => {
        dispatch(getSingleProductThunk(id));
        dispatch(getAllCartItemsThunk())
        dispatch(getAllReviewsThunk(id))
            .then(() => setIsLoaded(true))
    }, [dispatch, id]);

    if (product.error) {
        return <PageNotFound />;
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!sessionUser) {
            return (
                <OpenModalButton
                    modalComponent={<LoginFormModal />}
                    buttonText="Login to Add to Cart"
                />
            );
        }

        const inCartQuantity = inCartItemsArr.reduce((total, item) => {
            if (item.product_id === product.id) {
                return total + item.quantity;
            }
            return total;
        }, 0);

        if (inCartQuantity >= product.quantity) {
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



    return (
        <>
            {isLoaded ? (
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
                        <div className="review-container-wrapper">
                            <div className="star-review-container">
                                <span>{reviews ? reviews.length : 0} reviews</span>
                                <span>
                                    {reviews && reviews.length === 0 ? (
                                        <span><i className="fa-solid fa-star"></i> New</span>
                                    ) : (
                                        <span>
                                            <i className="fa-solid fa-star"></i> {parseFloat(product.avgRating).toFixed(1)}
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="review-top-container">
                                <div className={`reviews_heading ${reviews && reviews.length === 0 ? 'no_reviews_heading' : ''}`}>
                                    {reviews && reviews.length === 0 ? <p className="review-headings">Be the first to review!</p> : <p className="review-headings">Reviews</p>}
                                </div>
                                <div className="post-button">
                                    {sessionUser && sessionUser.id !== product.user_id && (!reviews || !reviews.find(review => review.userId === sessionUser.id)) && (
                                        <OpenModalButton
                                            className="post-review-button"
                                            modalComponent={<PostReviewModal productId={product.id} />}
                                            buttonText="Post Your Review"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="reviews-container">

                                <div className="reviews-display">
                                    {reviews && reviews.map(review => {
                                        // console.log(review, "================", review.id);
                                        return (
                                            <div key={review.id} className='review_div'>
                                                {sessionUser && sessionUser.id === review.userId && (
                                                    <div className='comment_edit_delete_buttons_div'>
                                                        <OpenModalButton
                                                            buttonText={
                                                                <i className='edit_review_button fa-solid fa-pen-to-square' />
                                                            }
                                                            modalComponent={
                                                                <PostReviewModal
                                                                    productId={id}
                                                                    reviewId={review.id}
                                                                />
                                                            }
                                                        />
                                                        <OpenModalButton
                                                            buttonText={
                                                                <i className='remove_review_button fa-solid fa-trash' />
                                                            }
                                                            modalComponent={
                                                                <DeleteReviewModal review={review} />
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div
                                                    className={
                                                        sessionUser && sessionUser.id === review.userId
                                                            ? 'review_wrapper_with_buttons'
                                                            : 'review_wrapper'
                                                    }
                                                >
                                                    <div className='comment'>{review.comment}</div>
                                                </div>
                                                <div className='comment_details_div'>
                                                    <div className='comment_author'>
                                                        <i className="fa-regular fa-user"> </i> {review.user.firstName}
                                                        <span> rated <i className="fa-solid fa-star"></i> {review.rating}</span>
                                                    </div>
                                                    <div className='comment_timestamp_div'>
                                                        <div className='comment_timestamp'>
                                                            Posted On: {new Date(review.createdAt).toLocaleString()}
                                                        </div>
                                                        <div className='comment_timestamp'>
                                                            Last Edited: {new Date(review.updatedAt).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {/* <OpenModalButton
                                className='post_comment_button'
                                buttonText='Review'
                                modalComponent={<PostReviewModal productId={id} />}
                            /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail-container">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        {sessionUser ? (
                            <form onSubmit={handleAddToCart}>
                                <button type="submit">Add to Cart</button>
                            </form>
                        ) : (
                            <OpenModalButton
                                className="login-form-button"
                                modalComponent={<LoginFormModal />}
                                buttonText="Login to Add to Cart"
                            />
                        )}
                    </div>
                </div>

            ) : <Loading />}
        </>
    );
}

export default ProductDetails;
