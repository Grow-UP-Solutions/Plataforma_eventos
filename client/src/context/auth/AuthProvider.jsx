import React, { useReducer } from 'react';
import { AuthContext, authReducer } from './index';

const Auth_INITIAL_STATE = {
  logged: false,
  user: {},
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

  const login = (user) => {
    dispatch({ type: 'Auth - Login', payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
