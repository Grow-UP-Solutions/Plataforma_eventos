import React, { useState } from 'react';
import { stateContext } from './stateContext';

export const Data = ({children}) => {

  const [result, setResult] = useState('');
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState([]);
  
  return (
    <stateContext.Provider value={{ 
      result, setResult, 
      notes, setNotes, 
      msg, setMsg, 
    }}>
      { children }
    </stateContext.Provider>
  );
}