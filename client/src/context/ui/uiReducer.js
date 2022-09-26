export const uiReducer = (state, action) => {
  switch (action.type) {
    case 'UI - Toggle Login':
      return {
        ...state,
        isMenuLoginOpen: !state.isMenuLoginOpen,
      };
    default:
      return state;
  }
};
