const GET_ALL_CATEGORIES = 'categories/GET_ALL_CATEGORIES'


export const getAllCategories = categories => ({
    type: GET_ALL_CATEGORIES,
    payload: categories
})

export const getAllCategoriesThunk = () => async (dispatch) => {
    const res = await fetch ('/api/categories/')

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllCategories(data));
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

const initialState = {

}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_CATEGORIES: {
            const newState = {}
            for (const category of action.payload) {
                newState[category.id] = category
            }
            return newState
        }
        default:
            return state
    }
}
