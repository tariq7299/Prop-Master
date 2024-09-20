import { axiosPrivate } from "../axiosInstances";
import { handleApiError } from "./handleApiError";
import { handleApiSuccess } from "./handleApiSuccess";
import axios from "axios";
import { SuccessApiResponse } from "./types";


async function handleGettingRouteData(route: string, showToast: boolean=true): Promise<SuccessApiResponse | Error | void>{
        try {
          const response = await axiosPrivate.get(route)
          handleApiSuccess(response?.data, showToast)
          return response?.data
        } catch (error: unknown) {
          if (axios.isAxiosError(error) || (error instanceof Error)) {
            handleApiError(error);
            return error
          }else {
            console.error(error)
          }
        }
}

export {handleGettingRouteData}