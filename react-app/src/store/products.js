
const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'products/GET_SINGLE_PRODUCT'
const ADD_NEW_PRODUCT = 'products/ADD_NEW_PRODUCT'
const UPDATE_PRODUCT ='products/UPDATE_PRODUCT'
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const GET_USER_PRODUCTS = 'products/GET_USER_PRODUCTS'

//action creator

export const getAllProducts = products => ({
    type: GET_ALL_PRODUCTS,
    payload: products
})

export const addNewProduct = product => ({
    type: ADD_NEW_PRODUCT,
    payload: product
})

export const getSingleProduct = product => ({
    type: GET_SINGLE_PRODUCT,
    payload: product
})

export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product
})

export const deleteProduct = productId => ({
    type: DELETE_PRODUCT,
    payload: productId
})

export const getUserProducts = products => ({
    type: GET_USER_PRODUCTS,
    payload: products
})


//thunks
export const getAllProductsThunk = () => async (dispatch) => {
    const res = await fetch ('/api/products/')

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllProducts(data));
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

export const getSingleProductThunk = (productId) => async (dispatch) => {
    const res = await fetch (`/api/products/${productId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getSingleProduct(data))
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

export const addNewProductThunk = product => async (dispatch) => {
    const res = await fetch('/api/products/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addNewProduct(data));
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

export const updateProductThunk = (id, product) => async (dispatch) => {
    const res = await fetch (`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(updateProduct(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const deleteProductThunk = productId => async (dispatch) => {
    const res = await fetch (`/api/products/${productId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteProduct(productId));
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

export const getUserProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products/current')

    if (res.ok) {
        const data = await res.json();
        dispatch(getUserProducts(data));
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


//reducer

const initialState = {
    allProducts : {},
    singleProduct: {},
    userProducts : {}
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_PRODUCTS: {
            const products = {}
            for (const product of action.payload) {
                products[product.id] = product
            }
            return {...state, allProducts: products}
        }
        case GET_SINGLE_PRODUCT: {
            console.log(action.payload);
            return {...state, singleProduct: action.payload}
        }
        case GET_USER_PRODUCTS: {
            const products = {}
            for (const product of action.payload) {
                products[product.id] = product
            }
            return {...state, userProducts: products}
        }
        case ADD_NEW_PRODUCT: {
            const newState = {...state}
            newState.allProducts = {...state.allProducts, [action.payload.id] : action.payload}
            newState.userProducts = {...state.userProducts, [action.payload.id]: action.payload}
            return newState
        }
        case UPDATE_PRODUCT: {
            const newState = {...state}
            newState.allProducts = {...state.allProducts, [action.payload.id] : action.payload}
            newState.userProducts = {...state.userProducts, [action.payload.id]: action.payload}
            newState.singleProduct = action.payload
            return newState
        }
        case DELETE_PRODUCT: {
            const newState = {...state}
            newState.allProducts = {...state.allProducts}
            newState.userProducts = {...state.userProducts}
            newState.singleProduct = null
            delete newState.allProducts[action.payload]
            delete newState.userProducts[action.payload]
            return newState
        }

        default:
            return state
    }
}
