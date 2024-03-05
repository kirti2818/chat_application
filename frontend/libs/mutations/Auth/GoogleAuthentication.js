import api from "@/app/api";
import { useMutation } from "@tanstack/react-query";


const useGoogleAuthentication = ()=>{
    const mutate = useMutation({
       
        mutationFn : async()=>{
            const response = await api.post(`users/googleAuthentication`,{})
            return response?.data?.data
        }
    })
    return mutate;
}

export default useGoogleAuthentication