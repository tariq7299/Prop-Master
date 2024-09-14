import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/Auth/auth-provider';
import React, { useState, useEffect } from 'react';
import SecureLS from 'secure-ls';

// This will handle the authorization of my routes in the whole app
// So when user navigates to any route it will first trigger this component
// And it will send a get request with the user token to check if the user is authenticated or not
// If not then it will navigate him/her to login page
// If he is authenticated then it will directs him/her to his/her requested route
const PrivateRoute = () => {

  const ls = new SecureLS();
  const token = ls.get('token');
  // ls.removeAll();
  // This funciton provided by CONTEXT API to check whether the current user is authenticated or not
  //   const {  } = useAuth();

  // It will set a loading indecator untill the server responded with user auth state and tell us whether he is authenticated or not
  //   const [isLoading, setIsLoading] = useState(true);

  //   const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   useEffect(() => {
  //     const checkAuthentication = async () => {
  //       try {
  //         const isAuthenticatedResult = await checkIfAuthenticated();

  //         setIsAuthenticated(isAuthenticatedResult);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.error('Error checking authentication:', error);
  //         setIsAuthenticated(false);
  //         setIsLoading(false);
  //       }
  //     };

  //     checkAuthentication();
  //   }, []);



  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
