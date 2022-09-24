import React, { useReducer } from 'react';
import { UIContext, uiReducer } from './';

const UI_INITIAL_STATE = {
  isMenuLoginOpen: false,
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleScreenLogin = () => {
    dispatch({ type: 'UI - Toggle Login' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        toggleScreenLogin,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
