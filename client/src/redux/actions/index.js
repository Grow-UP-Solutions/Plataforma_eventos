
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

export function getEventsCopy() {

  return async function (dispatch) {

    const json = await axios.get('https://plataformaeventos-production-6111.up.railway.app/events');

    return dispatch({
      type: 'GET_EVENTS_COPY',
      payload: json.data,
    });
  }
}

export function postEvent(payload) {

  return async function (dispatch) {
    console.log('payload,',payload)

    const json = await axios.post('https://plataformaeventos-production-6111.up.railway.app/events/create',payload);
    console.log('res:',json.data)
    
    return dispatch({
      type: 'POST_EVENT',
      payload:json.data
    
    });
  }
}



export function getColombia() {

  return async function (dispatch) {

    const json = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json');

    return dispatch({
      type: 'GET_COLOMBIA',
      payload: json.data,
    });
  }
}




