import { useContext, createContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

  const loginHandler = async (authData) => {

    try {

      const response = await axios.post(
        process.env.development.REACT_APP_API_URL,
        authData
      );

      console.log("response", response)

      const res = response.data;

      Cookies.set('token', res.token);

      // localStorage.setItem('userData', res.userData.username);

      navigate('/');

    } catch (error) {
      console.log("error", error)
      // errorHandler(error, addAlert, navigate)
    }

  };

  const authContext = {
    login: loginHandler
  }


  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};


export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
  };
  