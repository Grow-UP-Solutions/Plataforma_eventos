import React, { useReducer } from 'react';
import { UIContext, uiReducer } from '.';
import eventsApi from '../../axios/eventsApi';

const UI_INITIAL_STATE = {
  isMenuLoginOpen: false,
  categories: [],
  events: [],
  eventsFavourites: [],
  ratingOrg: 0,
  ratingEvent: 0,
  msgStar: [],
  codeReferal: [],
  deleteConversation: '',
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

  const getAllUsers = async () => {
    const res = await eventsApi.get('/users');
    dispatch({ type: 'GET_ALL_USERS', payload: res.data });
  }

  const getEventsFavourites = async (id, payload) => {
    const res = await eventsApi.put(`/users/${id}/favorites`, payload);
    const json = res.data;
    dispatch({ type: 'GET_EVENTS_FAVOURITES', payload: json });
  }

  const getEventsWithoutFavourites = async (id, payload) => {
    const res = await eventsApi.put(`/users/${id}/notFavorites`, payload);
    const json = res.data;
    dispatch({ type: 'GET_EVENTS_WITHOUT_FAVOURITES', payload: json });
  }

  const getRatingOrganizer = async (id, payload) => {
    const res = await eventsApi.put(`/users/${id}/rating`, payload);
    const json = res.data;
    dispatch({ type: 'GET_RATING_ORGANIZER', payload: json });
  }

  const getRatingEvent = async (id, payload) => {
    const res = await eventsApi.put(`/events/${id}/rating`, payload);
    const json = res.data;
    dispatch({ type: 'GET_RATING_EVENT', payload: json });
  }

  const getEffectRatingOrganizer = (json) => {
    dispatch({type: 'GET_EFFECT_RATING_ORGANIZER', payload: json});
  }

  const getEffectRatingEvent = (json) => {
    dispatch({type: 'GET_EFFECT_RATING_EVENT', payload: json});
  }

  /* const getMsgStar = (json) => {
    dispatch({type: 'GET_MSG_STAR', payload: json});
  }
 */
  const getMessagesStar = (json) => {
    dispatch({type: 'GET_MESSAGES_STAR', payload: json});
  }

  const deleteConversation = async (data) => {
    const res = await eventsApi.put('/conversation/delete', data);
    const json = res.data;
    dispatch({ type: 'DELETE_CONVERSATION', payload: json });
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        //Methods
        toggleScreenLogin,
        getCategories,
        getAllEvents,
        getAllUsers,
        getEventsFavourites,
        getEventsWithoutFavourites,
        getRatingOrganizer,
        getRatingEvent,
        getEffectRatingOrganizer,
        getEffectRatingEvent,
        /* getMsgStar, */
        getMessagesStar,
        deleteConversation,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
