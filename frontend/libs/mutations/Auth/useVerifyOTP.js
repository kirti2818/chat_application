import { useMutation } from "@tanstack/react-query";
import api from "@/app/api";
import toast from "react-hot-toast";

const useVerifyOTP = ()=>{
    const mutate = useMutation({
        mutationFn : async(data)=>{
            console.log(data)
            const response = await api.post("users/verifyEmail",data)
            return response?.data;
        },onSuccess : (data)=>{
            toast.success(data?.message)
        },onError:(error)=>{
            toast.error(error?.response?.data?.message)
        }
    })
    return mutate ;
}

export default useVerifyOTP;