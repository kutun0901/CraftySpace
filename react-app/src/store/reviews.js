const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

export const getAllReviews = reviews => ({
    type: GET_ALL_REVIEWS,
    payload: reviews
})

export const createReview = review => ({
    type: CREATE_REVIEW,
    payload: review
})

export const updateReview = review => ({
    type: UPDATE_REVIEW,
    payload: review
})

export const deleteReview = (productId, reviewId) => ({
    type: DELETE_REVIEW,
    productId,
    reviewId
})

export const getAllReviewsThunk = productId => async (dispatch) => {
    const res = await dispatch(`/api/products/${productId}/reviews`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllReviews(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const createReviewThunk = (productId, review) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(createReview(data));
        return null
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const updateReviewThunk = review => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(updateReview(data));
        return null
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const deleteReviewThunk = reviewId => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteReview(comment.expenseId, comment.id));
        return null
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}


const initialState = {}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_REVIEWS: {
            const newState = {...state};
            newState[action.payload.id] = action.payload.reviews;
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {...state}
            newState[action.payload.id] = [...state[action.payload.id], action.payload.review]
            return newState;
        }
        case UPDATE_REVIEW: {
            const newState = {...state}
            newState[action.payload.id] = [ ...state[action.payload.id] ]
            const reviewIndex = newState[action.payload.id].findIndex(review => review.id === action.payload.review.id);
            newState[action.payload.id].splice(reviewIndex, 1, action.payload.review)
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            newState[action.expenseId] = [ ...state[action.expenseId] ]
            const reviewIndex = newState[action.reviewId].findIndex(review => review.id === action.reviewId);
            newState[action.expenseId].splice(reviewIndex, 1)
            return newState;
        }
        default: {
            return state
        }
    }
}
