import { Navigate, Outlet } from 'react-router-dom';
import SecureLS from 'secure-ls';

// This will handle the authorization of my routes in the whole app
// So when user navigate s to any route it will first trigger this component
// And it will send a get request with the user token to check if the user is authenticated or not
// If not then it will navigate him/her to login page
// If he is authenticated then it will directs him/her to his/her requested route
const PrivateRoute = () => {

  const ls = new SecureLS();
  const token = ls.get('token');

  return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
