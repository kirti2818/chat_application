import api from "@/app/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllMessage = (queries) => {
    console.log(queries)
  const query = useQuery({
    queryKey: ["GetAllMessage", queries],
    queryFn: async () => {
        let Query = "";
        for(const key in queries){
            Query = Query+`${key}=${queries[key]}&`
        }
        console.log(Query)
      const response = await api.get(`message/getAllChats?${Query}`);
      return response?.data?.data;
    },
  });
  return query;
};

export default useGetAllMessage;
