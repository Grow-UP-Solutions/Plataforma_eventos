import React, { createContext, useState } from 'react';

export const Context = createContext();

export const Data = ({children}) => {

  const [result, setResult] = useState('');

  return (
    <Context.Provider value={{ result, setResult }}>
      { children }
    </Context.Provider>
  );
}


