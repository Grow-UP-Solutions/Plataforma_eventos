import React, { useState } from 'react';
import { stateContext } from './stateContext';

export const Data = ({children}) => {

  const [result, setResult] = useState('');
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState([]);
  const [conversa, setConversa] = useState([]);
  
  return (
    <stateContext.Provider value={{ 
      result, setResult, 
      notes, setNotes, 
      msg, setMsg, 
      conversa, setConversa,
    }}>
      { children }
    </stateContext.Provider>
  );
}