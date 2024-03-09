import api from "@/app/api";
import { useQuery } from "@tanstack/react-query";

const useGetSingleChats = (id) => {
  const query = useQuery({
    queryKey: ["GetSingleChats", id],
    queryFn: async () => {
      const response = await api.get(`chat/getSingleChat/${id}`);
      return response?.data?.data;
    },
    enabled: Boolean(id),
  });
  return query;
};

export default useGetSingleChats;
