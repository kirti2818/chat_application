// import api from "@/app/api";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const useAddNewMessage = ()=>{
//     const mutate = useMutation({
//         mutationFn:async(data)=>{
//             const response = await api.post("message/add_newMessage",data)
//             return response?.data;
//         },onSuccess:(data)=>{
//             toast.success(data?.message);
//         },onError:(error)=>{
//             toast.error(error?.response?.data?.message)
//         }
//     })
//     return mutate;
// }

// export default useAddNewMessage;