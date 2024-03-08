import { RecentChatData } from "@/Slices/User.Slice";
import api from "@/app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useCreateChat = () => {
    const dispatch = useDispatch()
    const query = useQueryClient()
  const mutate = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await api.post("chat/accessChat", data);
      await dispatch(RecentChatData({...response?.data?.data}))
      return response?.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries("/getAllChats")
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return mutate;
};

export default useCreateChat;
