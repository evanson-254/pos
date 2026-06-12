import axios from "axios";
import { toast } from "sonner";


const baseUrl = import.meta.env.VITE_API_URL;
const apiExt = "/api/v1";
const apiUrl = baseUrl + apiExt;

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;


export const apiRequest = async (method: "GET" | "POST"| "DELETE", url: string, data?: any) => {
    url = apiExt + url;
    try {
        if (method === "GET") {
            const { data: apiData, status } = await axios.get(url);
            return {data: apiData, errors: null, message: apiData?.message, status: status};
        }
        else if(method=="DELETE"){
            const { data: apiData, status } = await axios.delete(url);
            return {data: apiData, errors: null, message: apiData?.message, status: status};
        }
        else if (method === "POST") {
            await axios.get("sanctum/csrf-cookie");
            const { data: apiData , status} = await axios.post(url, data);
           //apiData?.status=="success"? toast.success(apiData?.message);
            return {data: apiData, errors: null, message: apiData?.message, status: status};
        }
        throw new Error("Invalid method");
    } catch (error:any) {
        const response = error?.response;
        if(response){
            const message = response.data?.message;
            const errors = response.data?.errors;
            toast.error(message);
            return {data: null, errors, message, status: response.status};
        }
        const message = error?.message;
        toast.error(message);
        return {data: null, errors: null, message, status: 500};
    }
}