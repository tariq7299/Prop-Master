import { axiosPrivate } from "../axiosInstances";
import { handleApiError } from "./handleApiError";
import { handleApiSuccess } from "./handleApiSuccess";
import axios from "axios";
import { toast } from '@/components/ui/use-toast'
import { SuccessApiResponse } from "./types";


async function handleGettingRouteData(route: string): Promise<SuccessApiResponse | Error | void>{
        try {
          const response = await axiosPrivate.get(route)
          handleApiSuccess(response?.data, toast)
          return response?.data
        } catch (error: unknown) {
          if (axios.isAxiosError(error) || (error instanceof Error)) {
            handleApiError(error, toast);
            return error
          }else {
            console.error(error)
          }
        }
}

export {handleGettingRouteData}