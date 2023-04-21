const GET_SEARCH_RESULT = 'search/GET_SEARCH_RESULT'
const RESET_SEARCH_RESULT = ''

export const getSearchResult = products => ({
    type: GET_SEARCH_RESULT,
    payload: products
})

export const getSearchResultThunk = (keyword) => async (dispatch) => {
    const res = await fetch (`/api/search/${keyword}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getSearchResult(data));
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

const RESET_SEARCH_RESULT = 'search/RESET_SEARCH_RESULT';

export const resetSearchResult = () => ({
  type: RESET_SEARCH_RESULT
});

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_RESULT: {
      const newState = { ...state };
      action.payload.forEach(product => {
        newState[product.id] = product;
      });
      return newState;
    }
    case RESET_SEARCH_RESULT: {
      return initialState;
    }
    default:
      return state;
  }
}
