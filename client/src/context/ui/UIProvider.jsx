import React, { useReducer } from 'react';
import { UIContext, uiReducer } from '.';

const UI_INITIAL_STATE = {
  isMenuLoginOpen: false,
  categories: [],
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleScreenLogin = () => {
    dispatch({ type: 'UI - Toggle Login' });
  };

  const getCategories = async() => {
    const data = await fetch('https://plataformaeventos-production-6111.up.railway.app/category');
    const json = await data.json();
    dispatch({ type: 'GET_CATEGORIES', payload: json });
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        toggleScreenLogin,
        getCategories,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
