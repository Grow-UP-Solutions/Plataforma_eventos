import React, { useReducer } from 'react';
import eventsApi from '../../axios/eventsApi';
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

  const logout = () => {
    localStorage.clear();
    dispatch({ type: 'Auth - Logout' });
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return logout();

    try {
      const { data } = await eventsApi.get('/users/login/renew');

      console.log(data);

      const user = {
        uid: data.uid,
        name: data.name,
        email: data.email,
        organizer: data.organizer,
      };

      localStorage.setItem('token', data.token);
      login(user);
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //Methods
        login,
        logout,
        checkAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
