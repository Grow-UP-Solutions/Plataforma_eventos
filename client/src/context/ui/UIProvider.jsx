import React, { useReducer } from 'react';
import { UIContext, uiReducer } from '.';
import eventsApi from '../../axios/eventsApi';

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
    const res = await eventsApi.get('/category');
    dispatch({ type: 'GET_CATEGORIES', payload: res.data });
  }

  const getAllEvents = async () => {
    const res = await eventsApi.get('/events');
    dispatch({ type: 'GET_ALL_EVENTS', payload: res.data });
  }

  const getEventsFavourites = async (id, payload) => {
    const res = await eventsApi.put(`/users/${id}/favorites`, payload);
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
