
import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const Maps = (props) => {

  return (
    <GoogleMap 
      defaultZoom={12}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    />    
  );
}

export default withScriptjs(withGoogleMap(Maps));
