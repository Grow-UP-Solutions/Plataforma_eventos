import React, { useReducer } from 'react';
import { UIContext, uiReducer } from '.';

const UI_INITIAL_STATE = {
  isMenuLoginOpen: false,
  categories: [],
  events: [],
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleScreenLogin = () => {
    dispatch({ type: 'UI - Toggle Login' });
  };

  const getCategories = async () => {
    const data = await fetch('https://plataformaeventos-production-6111.up.railway.app/category');
    const json = await data.json();
    dispatch({ type: 'GET_CATEGORIES', payload: json });
  }

  const getAllEvents = async () => {
    const data = await fetch('https://plataformaeventos-production-6111.up.railway.app/events');
    const json = await data.json();
    dispatch({ type: 'GET_ALL_EVENTS', payload: json });
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        toggleScreenLogin,
        getCategories,
        getAllEvents,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
