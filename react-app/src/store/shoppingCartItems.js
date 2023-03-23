
const GET_ALL_CART_ITEMS = 'products/GET_ALL_CART_ITEMS'
const ADD_ITEM_TO_CART = 'products/ADD_ITEM_TO_CART'
const UPDATE_CART = 'products/UPDATE_CART'
const REMOVE_ITEM = 'products/REMOVE_ITEM'
const RESET = 'products/RESET'

//action creator

export const getAllCartItems = items => ({
    type: GET_ALL_CART_ITEMS,
    payload: items
})

export const addItemToCart = item => ({
    type: ADD_ITEM_TO_CART,
    payload: item
})


export const updateCart = item => ({
    type: UPDATE_CART,
    payload: item
})

export const removeItem = itemId => ({
    type: REMOVE_ITEM,
    payload: itemId
})

export const reset = () => ({
    type: RESET
})


//thunks
export const getAllCartItemsThunk = () => async (dispatch) => {
    const res = await fetch('/api/incart/')

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllCartItems(data));
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


export const addItemToCartThunk = item => async (dispatch) => {
    const res = await fetch('/api/incart/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addItemToCart(data));
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const updateCartThunk = item => async (dispatch) => {
    const res = await fetch(`/api/products/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(updateCart(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const removeItemThunk = itemId => async (dispatch) => {
    const res = await fetch(`/api/products/${itemId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeItem(itemId));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}



//reducer

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CART_ITEMS: {
            const newState = {}
            for (const item of action.payload) {
                newState[item.id] = item
            }
            return newState
        }
        case ADD_ITEM_TO_CART: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
          }
        case UPDATE_CART: {
            const newState = { ...state }
            newState.cart[action.payload.id].quantity = action.payload.quantity
            return newState
        }
        case REMOVE_ITEM: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState
          }
        case RESET: {
            return initialState
        }
        default:
            return state
    }
}
