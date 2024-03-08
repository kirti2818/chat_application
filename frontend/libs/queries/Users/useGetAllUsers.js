import api from "@/app/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = (queries) => {
    console.log(queries)
  const query = useQuery({
    queryKey: ["GetAllUsers", queries],
    queryFn: async () => {
        let Query = "";
        for(const key in queries){
            Query = Query+`${key}=${queries[key]}&`
        }
        console.log(Query)
      const response = await api.get(`users/getAllUsers?${Query}`);
      return response?.data?.data;
    },
  });
  return query;
};

export default useGetAllUsers;
