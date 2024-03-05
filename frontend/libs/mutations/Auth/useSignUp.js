import api, { baseURL } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useSignup = ()=>{
    const mutate = useMutation({
        mutationFn : async(data)=>{
            console.log(data)
            const response = await api.post(`users/signup`,data)
            console.log(response)
            return response?.data ;
        },onSuccess:(data)=>{
            toast.success(data?.message)
        },onError:(error)=>{
            toast.error(error?.response?.data?.message)
        }
    })
    return mutate ;
}

export default useSignup;