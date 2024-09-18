import React, { useContext, createContext } from 'react';
import axios from 'axios';
import { newAdminSignUpSchema, adminLoginSchema } from '@/pages/auth/types';
import { z } from 'zod'
import { handleApiSuccess } from '@/helper/api-requests/handleApiSuccess';
import { handleApiError } from '@/helper/api-requests/handleApiError';
import { IsLoadingCustom, Admin } from '@/pages/auth/types';
import useLocalStorage from '../use-local-storage';
import SecureLS from 'secure-ls';
import { axiosPrivate } from '@/helper/axiosInstances';
import { toast } from '@/components/ui/use-toast'



type AuthContext = {
  signUp: (authData: z.infer<typeof newAdminSignUpSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | 'signing out' | ''>) => void) => void
  signIn: (authData: z.infer<typeof adminLoginSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | 'signing out' | ''>) => void, loadingMessage?: string) => void,
  signOut: (setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | 'signing out' | ''>) => void,) => void,
  user: Admin
}

const defaultUserValue = {
  name: "",
  phone_number: "",
  email: "",
  company: "",
  device_id: null,
  role_id: null,
  id: null,
  role: {
    id: null,
    name: null,
  }
}

const initialAuthContext = {
  signUp: () => { },
  signIn: () => { },
  signOut: () => { },
  user: defaultUserValue,
}


const AuthContext = createContext<AuthContext>(initialAuthContext);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const ls = new SecureLS();
  const [user, setUser] = useLocalStorage<Admin>({
    key: 'user',
    defaultValue: defaultUserValue
  })



  const signInHandler = async (authData: z.infer<typeof adminLoginSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | 'signing out' | ''>) => void, loadingMessage?: string) => {

    console.log("LogInauthData", authData)

    setIsLoading({ status: true, message: loadingMessage || "Checking...", type: "signing in" })

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/subadmin/login`,
        authData
      );

      setIsLoading({ status: true, message: loadingMessage || "Redirecting to your dashboard...", type: "signing in" })

      handleApiSuccess(response?.data, toast, '', () => setTimeout(() => {
        window.location.href = '/'
        ls.set('token', response?.data?.data?.token);
        setUser({ ...response?.data?.data?.data, company: response?.data.data.data.company || "" })
      }, 3000))

    } catch (error: unknown) {
      setIsLoading({ status: false, message: "", type: "" })
      if (axios.isAxiosError(error) || (error instanceof Error)) {
        handleApiError(error, toast);
      }
    }

  };

  const signOutHandler = async (setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | 'signing out' | ''>) => void,) => {

    setIsLoading({ status: true, message: "Logging out...", type: "signing out" })


    try {

      const response = await axiosPrivate.post("/auth/logout");
      handleApiSuccess(response?.data, toast, '', () => {
        window.location.href = '/sign-in';
        ls.remove('token');
      })

    } catch (error: unknown) {
      if (axios.isAxiosError(error) || (error instanceof Error)) {
        handleApiError(error, toast);
      }
    }

  };

  const signUpHandler = async (authData: z.infer<typeof newAdminSignUpSchema>, setIsLoading: (arg0: IsLoadingCustom<"signing up" | "signing in" | 'signing out' | ''>) => void) => {
    setIsLoading({ status: true, message: "Registering new Admin...", type: "signing up" })
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/admin/register`,
        authData
      );
      const logInCredentials = { "email": authData?.email || 'wrong@gmail.com', "password": authData?.password || 'wrong' }
      handleApiSuccess(response?.data, toast, '', () => signInHandler(logInCredentials, setIsLoading, "Redirecting to your dashboard..."))
    } catch (error: unknown) {
      setIsLoading({ status: false, message: "", type: "" })
      if (axios.isAxiosError(error) || (error instanceof Error)) {
        handleApiError(error, toast);
      }
    }

  };


  const value = {
    signUp: signUpHandler,
    signIn: signInHandler,
    signOut: signOutHandler,
    user: user,
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
