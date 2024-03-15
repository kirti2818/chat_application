import { AddOtherMemberId } from "@/Slices/User.Slice";
import useCreateChat from "@/libs/mutations/Chat/useCreateChat";
import useGetAllUsers from "@/libs/queries/Users/useGetAllUsers";
import { Input, User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

const SearchPage = ({setOpenSearchModal}) => {
  const [search, setSearch] = useState();
  const {mutate : CreateChat , isLoading : CreateChatLoading,isError : CreateChatLoadingError,isSuccess:CreateChatSuccess } = useCreateChat()
  const dispatch = useDispatch()


  const {
    data: GetAllUsers,
    isLoading: GetAllUsersLoading,
    isError: GetAllUsersError,
  } = useGetAllUsers({search});



    const handleChatUser = async(id)=>{
      dispatch(AddOtherMemberId(id))
      CreateChat({OtherMemberId : id})

    }

    useEffect(()=>{
      if(CreateChatSuccess){
        setOpenSearchModal(false)
      }

    },[CreateChatSuccess])

  return (
    <div className="flex flex-col gap-5 ">
      <div>
        <Input
          size="none"
          color="primary"
          autoFocus
          onChange={(e)=>setSearch(e.target.value)}
          endContent={
            <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          placeholder="Type To Search..."
          variant="bordered"
        />
      </div>
      <div className="flex flex-col gap-3 overflow-scroll scrollbar-hide h-[370px] pb-5">
        {search &&
          !GetAllUsersLoading &&
          !GetAllUsersError &&
          GetAllUsers?.map((el,i) => {
            return (
              <div key={i}  onClick={()=>handleChatUser(el?._id)} className="cursor-pointer w-full min-h-[50px] border rounded-md p-2">
                <User
                  name={el?.name}
                  description={el?.email}
                  avatarProps={{
                    src: `${el?.avatar}`,
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;
