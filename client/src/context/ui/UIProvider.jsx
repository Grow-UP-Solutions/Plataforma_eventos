import React, { useReducer } from 'react';
import { UIContext, uiReducer } from '.';
import axios from "axios";

const UI_INITIAL_STATE = {
  isMenuLoginOpen: false,
  categories: [],
  events: [],
  eventsFavourites: [],
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

  const getEventsFavourites = async (id, payload) => {
    const res = await axios.put(`https://plataformaeventos-production-6111.up.railway.app/users/${id}/favorites`, payload);
    const json = res.data;
    dispatch({ type: 'GET_EVENTS_FAVOURITES', payload: json });
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        toggleScreenLogin,
        getCategories,
        getAllEvents,
        getEventsFavourites,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
