
const initialState = {
  events: [],
  eventsCopy: [],
  departamentos:[],
  users:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case 'GET_EVENTS':
      return {
        ...state,
        events: action.payload,
    
      }

      case 'GET_EVENTS_COPY':
        return {
          ...state,
          eventsCopy: action.payload,     
        }

    case 'GET_COLOMBIA':
      return {
        ...state,
        departamentos: action.payload,
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
