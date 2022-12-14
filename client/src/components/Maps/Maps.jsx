import dotenv from 'dotenv';
import React from 'react';
import { useSelector } from 'react-redux';

const Maps = ({ id }) => {
  dotenv.config();
  const allEvents = useSelector((state) => state.events);
  const eventDetails = allEvents.filter((event) => event._id === id)[0];
  const municipio = eventDetails.municipio;
  const departamento = eventDetails.departamento;
  const location = `${municipio}, ${departamento}`;
  const apiKey = process.env.REACT_APP_GOOGLEMAPS_API_KEY;
  const zoom = '14';
  const size = '400x300';
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=${zoom}&size=${size}&key=${apiKey}`;

  return (
    <div>
      <img src={url} alt='mapaStaticGoogleMaps' />
    </div>
  );
};

export default Maps;
