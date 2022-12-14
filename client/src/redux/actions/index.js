import axios from 'axios';
import eventsApi from '../../axios/eventsApi';

//EVENTS
export function getEvents() {
  return async function (dispatch) {
    const json = await eventsApi.get('/events');

    return dispatch({
      type: 'GET_EVENTS',
      payload: json.data,
    });
  };
}

export function getEventsCopy() {
  return async function (dispatch) {
    const json = await eventsApi.get('/events');

    return dispatch({
      type: 'GET_EVENTS_COPY',
      payload: json.data,
    });
  };
}

export function postEvent(payload) {
  return async function (dispatch) {
    console.log('payload,', payload);

    const json = await eventsApi.post('/events/create', payload);
    console.log('res:', json.data);

    return dispatch({
      type: 'POST_EVENT',
      payload: json.data,
    });
  };
}

export function postEventSave(payload) {
  return async function (dispatch) {
    console.log('payload,', payload);

    const json = await eventsApi.post('/events/createAndNotPublic', payload);

    return dispatch({
      type: 'POST_EVENT',
      payload: json.data,
    });
  };
}

export function putEvent(payload, id) {
  return async function (dispatch) {
    console.log({ id });
    const json = await eventsApi.put(`/events/${id}`, payload);
    return dispatch({
      type: 'PUT_EVENT',
      payload: json.data,
    });
  };
}

export function getUsers() {
  console.log('entre a get user');
  return async function (dispatch) {
    const json = await eventsApi.get('/users');
    console.log('jason', json.data);
    return dispatch({
      type: 'GET_USERS',
      payload: json.data,
    });
  };
}

export function getColombia() {
  return async function (dispatch) {
    const json = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json');

    return dispatch({
      type: 'GET_COLOMBIA',
      payload: json.data,
    });
  };
}
