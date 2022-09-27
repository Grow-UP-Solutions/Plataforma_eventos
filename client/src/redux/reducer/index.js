
const initialState = {
  events: [],
  categories: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_EVENTS':
      return {
        ...state,
        events: action.payload,
      }

    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      }

    default:
    return state;
  }
}

export default rootReducer;
