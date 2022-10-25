
const initialState = {
  events: [],
  departamentos: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_EVENTS':
      return {
        ...state,
        events: action.payload,
      }

    case 'GET_COLOMBIA':
      return {
        ...state,
        departamentos: action.payload,
      }

    default:
    return state;
  }
}

export default rootReducer;
