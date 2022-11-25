
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const RutaPrivada = ({ redirectPath='/', children}) => {

  const { logged } = useContext(AuthContext);

  if (!logged) {
    return (
      <Navigate to={redirectPath} />
    )
  }
  else {
    return (
      children ? children : <Outlet />
    );
  }
  
}

export default RutaPrivada;
