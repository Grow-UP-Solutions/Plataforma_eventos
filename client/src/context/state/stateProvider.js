import React, { useState } from 'react';
import { stateContext } from './stateContext';

export const Data = ({children}) => {

  const [result, setResult] = useState('');
  const [search, setSearch] = useState([]);
  const [muni, setMuni] = useState('');
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState([]);
  const [conversa, setConversa] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [dateToBuy, setDateToBuy] = useState([]);
  
  return (
    <stateContext.Provider value={{ 
      result, setResult, 
      search, setSearch,
      muni, setMuni,
      notes, setNotes, 
      msg, setMsg, 
      conversa, setConversa,
      carrito, setCarrito,
      dateToBuy, setDateToBuy
    }}>
      { children }
    </stateContext.Provider>
  );
}