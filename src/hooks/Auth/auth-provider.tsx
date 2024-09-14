import React, { useContext, createContext } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
import { newAdminSignUpSchema, adminLoginSchema } from '@/pages/auth/types';
import { z } from 'zod'
import { handleApiSuccess } from '@/helper/api-requests/handleApiSuccess';
import { handleApiError } from '@/helper/api-requests/handleApiError';
import { useToast } from '@/components/ui/use-toast';
import { IsLoadingCustom } from '@/pages/auth/types';


type AuthContext = {
  signUp: (authData: z.infer<typeof newAdminSignUpSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | ''>) => void) => void
  signIn: (authData: z.infer<typeof adminLoginSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | ''>) => void, loadingMessage?: string) => void
}

const initialAuthContext = {
  signUp: () => { },
  signIn: () => { },
}


const AuthContext = createContext<AuthContext>(initialAuthContext);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()

  const signInHandler = async (authData: z.infer<typeof adminLoginSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | ''>) => void, loadingMessage?: string) => {

    console.log("LogInauthData", authData)

    setIsLoading({ status: true, message: loadingMessage || "Checking...", type: "signing in" })

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/login`,
        authData
      );

      setIsLoading({ status: true, message: loadingMessage || "Redirecting to your dashboard...", type: "signing in" })

      handleApiSuccess(response?.data, toast, '', () => setTimeout(() => {
        window.location.href = '/'
      }, 3000))


    } catch (error: unknown) {
      setIsLoading({ status: false, message: "", type: "" })
      if (axios.isAxiosError(error)) {
        handleApiError(error, toast);
      } else if ((error instanceof Error)) {
        handleApiError(error, toast);
      }
    }

  };

  const signUpHandler = async (authData: z.infer<typeof newAdminSignUpSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | "">) => void) => {

    setIsLoading({ status: true, message: "Registering new Admin...", type: "signing up" })

    try {
      // console.log("authData", authData)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/register`,
        authData
      );
      // console.log("response", response)

      const logInCredentials = { "email": authData?.email || 'wrong@gmail.com', "password": authData?.password || 'wrong' }

      // setIsLoading({ status: true, message: "Redirecting to your dashboard...", type: "signing in" })

      handleApiSuccess(response?.data, toast, '', () => signInHandler(logInCredentials, setIsLoading, "Redirecting to your dashboard..."))


    } catch (error: unknown) {
      setIsLoading({ status: false, message: "", type: "" })
      if (axios.isAxiosError(error)) {
        handleApiError(error, toast);
      } else if ((error instanceof Error)) {
        handleApiError(error, toast);
      }
    }

  };


  const value = {
    signUp: signUpHandler,
    signIn: signInHandler
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
