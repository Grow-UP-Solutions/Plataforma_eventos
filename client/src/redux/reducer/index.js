
const initialState = {
  events: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_EVENTS':
      return {
        ...state,
        events: action.payload,
      }

    default:
    return state;
  }
}

export default rootReducer;
