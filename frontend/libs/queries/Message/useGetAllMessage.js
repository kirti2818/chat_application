import api from "@/app/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllMessage = ({queries="",chatId=""}) => {
    console.log(queries,chatId)
  const query = useQuery({
    queryKey: ["GetAllMessage", queries,chatId],
    queryFn: async () => {
        let Query = "";
        for(const key in queries){
            Query = Query+`${key}=${queries[key]}&`
        }
        console.log(Query)
      const response = await api.get(`/message/get_allMessages/${chatId}?${Query}`);
      console.log(response)
      return response?.data?.data;
    },
    enabled:Boolean(chatId)
  });
  return query;
};

export default useGetAllMessage;
