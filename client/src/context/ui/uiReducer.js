
export const uiReducer = (state, action) => {
  switch (action.type) {

    case 'UI - Toggle Login':
      return {
        ...state,
        isMenuLoginOpen: !state.isMenuLoginOpen,
      };

    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };

    default:
    return state;
  }
};
