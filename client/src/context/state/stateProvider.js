import React, { useState } from 'react';
import { stateContext } from './stateContext';

export const Data = ({children}) => {

  const [result, setResult] = useState('');
  
  return (
    <stateContext.Provider value={{ result, setResult }}>
      { children }
    </stateContext.Provider>
  );
}