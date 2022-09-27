const initialState = {
  events: [],
  categories: [],
  users: [],
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

    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      }

    default:
    return state;
  }
}

export default rootReducer;
