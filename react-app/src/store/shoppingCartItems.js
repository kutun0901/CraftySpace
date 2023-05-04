const GET_ALL_CART_ITEMS = 'products/GET_ALL_CART_ITEMS'
const ADD_ITEM_TO_CART = 'products/ADD_ITEM_TO_CART'
const UPDATE_CART = 'products/UPDATE_CART'
const REMOVE_ITEM = 'products/REMOVE_ITEM'
const RESET_CART = 'products/RESET_CART'
const CLEAR_CART = 'products/CLEAR_CART'


//action creator

export const getAllCartItems = items => ({
    type: GET_ALL_CART_ITEMS,
    payload: items
})

export const addItemToCart = item => ({
    type: ADD_ITEM_TO_CART,
    payload: item
})


export const updateCart = (id, quantity) => {
    if (quantity < 1 || !quantity) return removeItem(id);
    return {
        type: UPDATE_CART,
        payload: { id, quantity }
    };
};

export const removeItem = itemId => ({
    type: REMOVE_ITEM,
    payload: itemId
})

export const resetCart = () => ({
    type: RESET_CART
})

export const clearCartItems = () => ({
    type: CLEAR_CART,
});


//thunks
export const getAllCartItemsThunk = () => async (dispatch) => {
    const res = await fetch('/api/incart/current')

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


export const addItemToCartThunk = (item) => async (dispatch) => {
    const res = await fetch('/api/incart/current', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addItemToCart(data));
        return data
    } else {
        const text = await res.text();
        return ["An Error occurred. Please try again later.", text];
    }
}

export const updateCartThunk = (item) => async (dispatch) => {
    const { id, quantity } = item;
    const res = await fetch(`/api/incart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateCart(id, quantity));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occurred. Please try again later."];
    }
};

export const removeItemThunk = itemId => async (dispatch) => {
    const res = await fetch(`/api/incart/${itemId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeItem(itemId));
        // return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const clearCartItemsThunk = () => async (dispatch) => {
    const res = await fetch('/api/incart/current', {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(clearCartItems());
    } else {
        const errors = await res.json();
        console.error(errors);
    }
};


//reducer

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CART_ITEMS: {
            const newState = { ...state }
            for (const item of action.payload) {
                newState[item.id] = item
            }
            return newState
        }
        case ADD_ITEM_TO_CART: {
            const newItem = action.payload;
            const newState = { ...state };
            // console.log(newState);
            const existingItem = newState[newItem.id];
            // console.log(existingItem);

            if (existingItem) {
                existingItem.quantity += Number(newItem.quantity);
            } else {
                newState[newItem.id] = { ...newItem, quantity: Number(newItem.quantity) };
            }

            return newState;
        }
        case UPDATE_CART: {
            const newState = { ...state }
            newState[action.payload.id].quantity = action.payload.quantity
            return newState
        }
        case REMOVE_ITEM: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        }
        case CLEAR_CART: {
            return initialState;
        }
        case RESET_CART: {
            return initialState
        }
        default:
            return state
    }
}
