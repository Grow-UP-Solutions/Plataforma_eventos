
export const uiReducer = (state, action) => {
  switch (action.type) {

    case 'UI - Toggle Login':
      return {
        ...state,
        isMenuLoginOpen: !state.isMenuLoginOpen,
      };

    case 'GET_CATEGORIES':

      const data = action.payload;
      const orden = data.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
      let nuevoArreglo = orden;
      nuevoArreglo.push(nuevoArreglo.shift());

      return {
        ...state,
        categories: nuevoArreglo,
      };

    case 'GET_ALL_EVENTS':
      return {
        ...state,
        events: action.payload,
      };

      case 'GET_ALL_USERS':
        return {
          ...state,
          events: action.payload,
        };

    case 'GET_EVENTS_FAVOURITES':
      return {
        ...state,
        eventsFavourites: action.payload,
      };

    case 'GET_EVENTS_WITHOUT_FAVOURITES':
      return {
        ...state,
        eventsFavourites: action.payload,
      };

    case 'GET_RATING_ORGANIZER':
      return {
        ...state,
        ratingOrg: action.payload.rating,
      };

    case 'GET_RATING_EVENT':
      return {
        ...state,
        ratingEvent: action.payload.rating,
      };

    case 'GET_EFFECT_RATING_ORGANIZER':
      return {
        ...state,
        ratingOrg: action.payload,
      };

    case 'GET_EFFECT_RATING_EVENT':
      return {
        ...state,
        ratingEvent: action.payload,
      };

    /* case 'GET_MSG_STAR':
      return {
        ...state,
        msgStar: action.payload,
      }; */

    case 'GET_MESSAGES_STAR':
      return {
        ...state,
        msgStar: action.payload,
      };

    case 'DELETE_CONVERSATION':
      return {
        ...state,
        deleteConversation: action.payload,
      };


    default:
    return state;
  }
};
