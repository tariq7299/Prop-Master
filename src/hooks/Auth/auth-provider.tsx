import React, { useContext, createContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { newAdminUserSchema } from '@/pages/auth/types';
import { z } from 'zod'
import { handleApiSuccess } from '@/helper/api-requests/handleApiSuccess';
import { handleApiError } from '@/helper/api-requests/handleApiError';
import { useToast } from '@/components/ui/use-toast';

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthContext = {
  signUp: (authData: z.infer<typeof newAdminUserSchema>, setIsLoading: (arg0: boolean) => void) => void
}

const initialAuthContext = {
  signUp: () => { },
  // signIn: signInHandler
}


const AuthContext = createContext<AuthContext>(initialAuthContext);


const AuthProvider = ({ children }: AuthProviderProps) => {
  // const navigate = useNavigate();
  const { toast } = useToast()

  // const signInHandler = async (authData: z.infer<typeof newAdminUserSchema>) => {

  //   try {

  //     const response = await axios.post(
  //       process.env.development.REACT_APP_API_URL,
  //       authData
  //     );

  //     console.log("response", response)

  //     const res = response.data;

  //     Cookies.set('token', res.token);

  //     // localStorage.setItem('userData', res.userData.username);

  //     navigate('/');

  //   } catch (error) {
  //     console.log("error", error)
  //     // errorHandler(error, addAlert, navigate)
  //   }

  // };

  const signUpHandler = async (authData: z.infer<typeof newAdminUserSchema>, setIsLoading: (arg0: boolean) => void) => {
    setIsLoading(true)
    try {
      console.log("authData", authData)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/register`,
        authData
      );
      console.log("response", response)

      handleApiSuccess(response?.data, toast)

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        handleApiError(error, toast);
      } else if ((error instanceof Error)) {
        handleApiError(error, toast);
      }
    } finally {
      setIsLoading(false)
    }

  };


  const value = {
    signUp: signUpHandler,
    // signIn: signInHandler
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
