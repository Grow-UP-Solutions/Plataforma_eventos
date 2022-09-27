
import axios from 'axios';

//EVENTS
export function getEvents() {

  return async function (dispatch) {

    const json = await axios.get('https://plataformaeventos-production-6111.up.railway.app/events');

    return dispatch({
      type: 'GET_EVENTS',
      payload: json.data,
    });
  }
}

//CATEGORIES
export function getCategories() {

  return async function (dispatch) {

    const json = await axios.get('https://plataformaeventos-production-6111.up.railway.app/category');

    return dispatch({
      type: 'GET_CATEGORIES',
      payload: json.data,
    });
  }
}



