import api, { baseURL } from "@/app/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import socket from "@/utils/Socket";
import { useRouter } from "next/navigation";

const useLogin = () => {
    const router = useRouter()
  const mutate = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await api.post(`users/login`, data);
      console.log(response);
      return response?.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      router.push("/")
      
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return mutate;
};

export default useLogin;
