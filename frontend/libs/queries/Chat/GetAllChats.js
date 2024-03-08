import api from "@/app/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllChats = (queries) => {
    console.log(queries)
  const query = useQuery({
    queryKey: ["GetAllChats", queries],
    queryFn: async () => {
        let Query = "";
        for(const key in queries){
            Query = Query+`${key}=${queries[key]}&`
        }
        console.log(Query)
      const response = await api.get(`chat/getAllChats?${Query}`);
      return response?.data?.data;
    },
  });
  return query;
};

export default useGetAllChats;
