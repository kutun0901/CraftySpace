// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getSingleProductThunk } from '../../store/products';
// import { getAllReviewsThunk } from '../../store/reviews';
// import OpenModalButton from '../OpenModalButton'
// import DeleteReviewModal from './DeleteReviewModal';
// import PostReviewModal from './PostReviewModal';


// function Reviews({ productId }) {

//     // console.log(productId);
//     // console.log(typeof productId);
//     const dispatch = useDispatch()
//     const sessionUser = useSelector(state => state.session.user);
//     const product = useSelector(state => state.products.singleProduct);
//     const reviews = useSelector(state => state.reviews[productId]);

//     // console.log("=========================", reviews);
//     console.log(Array.isArray(reviews));



//     useEffect(() => {
//         dispatch(getSingleProductThunk(productId))
//         dispatch(getAllReviewsThunk(productId))
//     }, [dispatch, productId])

//     if (!reviews) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             <div className="review-container">
//                 <div>
//                     <p>{reviews ? reviews.length : 0} reviews</p>
//                     <p>{reviews.length === 0 ? (
//                         <span><i className="fa-solid fa-star"></i> New</span>
//                     ) : (
//                         <span>
//                             <i className="fa-solid fa-star"></i>
//                             {parseFloat(product.avgRating).toFixed(1)}
//                         </span>
//                     )}
//                     </p>
//                 </div>
//                 <div className={`reviews_heading ${reviews && reviews.length === 0 ? 'no_reviews_heading' : ''}`}>
//                     {reviews && reviews.length === 0 ? 'Be the first to review!' : 'Reviews'}
//                 </div>
//                 <div className="reviews-container">
//                     {/* <div className="post-button">
//                         {reviews.find(review => review.userId === sessionUser.id) && (
//                             <OpenModalButton className="post-review-button" modalComponent={<PostReviewModal productId={product.id} reviewId={reviews.find(review => review.userId === sessionUser.id)} />} buttonText="Post Your Review" />
//                         )}
//                     </div> */}
//                     <div className="reviews-display">
//                         {reviews.map(review => {
//                             console.log(review, "================", review.id);
//                             return (
//                                 <div key={review} className='review_div'>
//                                     {sessionUser.id === review.userId && (
//                                         <div className='comment_edit_delete_buttons_div'>
//                                             <OpenModalButton
//                                                 buttonText={
//                                                     <i className='edit_review_button fa-solid fa-pen-to-square' />
//                                                 }
//                                                 modalComponent={
//                                                     <PostReviewModal
//                                                         productId={productId}
//                                                         reviewId={review.id}
//                                                     />
//                                                 }
//                                             />
//                                             <OpenModalButton
//                                                 buttonText={
//                                                     <i className='remove_review_button fa-solid fa-trash' />
//                                                 }
//                                                 modalComponent={
//                                                     <DeleteReviewModal review={review} />
//                                                 }
//                                             />
//                                         </div>
//                                     )}
//                                     <div
//                                         className={
//                                             sessionUser.id === review.userId
//                                                 ? 'review_wrapper_with_buttons'
//                                                 : 'review_wrapper'
//                                         }
//                                     >
//                                         <div className='comment'>{review.comment}</div>
//                                     </div>
//                                     <div className='comment_details_div'>
//                                         <div className='comment_author'>
//                                             {review.user.firstName}
//                                         </div>
//                                         <div className='comment_timestamp_div'>
//                                             <div className='comment_timestamp'>
//                                                 Posted On: {new Date(review.createdAt).toLocaleString()}
//                                             </div>
//                                             <div className='comment_timestamp'>
//                                                 Last Edited: {new Date(review.updatedAt).toLocaleString()}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                         <OpenModalButton
//                             className='post_comment_button'
//                             buttonText='Review'
//                             modalComponent={<PostReviewModal productId={productId} />}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Reviews;
