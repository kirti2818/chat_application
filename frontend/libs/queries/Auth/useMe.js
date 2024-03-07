import { useQuery } from "@tanstack/react-query";
import api from "@/app/api";

const useMe = ()=>{
    const query = useQuery({
        queryKey : ["/Me"],
        queryFn : async()=>{
            const response = await api.get("/users/getMyData")
            return response?.data?.data
        }
    })
    return query;
}

export default useMe;