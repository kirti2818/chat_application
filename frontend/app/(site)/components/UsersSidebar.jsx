import useCreateChat from "@/libs/mutations/Chat/useCreateChat";
import useGetAllChats from "@/libs/queries/Chat/GetAllChats";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

const UsersSidebar = ({ RecentChatData,setOpenSearchModal }) => {
  const [search, setSearch] = useState();
  const [show , setShow] = useState(true)
  const dispatch = useDispatch()
  const {mutate : CreateChat , isLoading : CreateChatLoading,isError : CreateChatLoadingError,isSuccess:CreateChatSuccess } = useCreateChat()
  const {
    data: GetAllChats,
    isLoading: GetAllChatsLoading,
    isError: GetAllChatsError,
    isSuccess: GetAllChatsSuccess,
  } = useGetAllChats(search);


  const handleChatUser = async(id)=>{
    dispatch(AddOtherMemberId(id))
    CreateChat({OtherMemberId : id})

  }

  console.log(RecentChatData);

  return (
    <div className={`${show ? "w-[200px]" : "w-[60px]" } border rounded-lg relative shadow-lg bg-white p-1 h-full overflow-auto scrollbar-hide flex flex-col gap-1`}>
      <div>
       {show ?  <FaArrowCircleLeft onClick={()=>setShow(false)} className="h-6 w-6 text-blue-500 absolute right-1" /> :  <FaArrowCircleRight onClick={()=>setShow(true)} className="h-6 w-6 text-blue-500 absolute right-1" />}
      </div>
      {!GetAllChatsLoading &&
        !GetAllChatsError &&
        GetAllChatsSuccess &&
        GetAllChats?.map((el, i) => {
          return (
            <>
            {el?.lastMessage && el?.lastMessage?.length>0 && <Tooltip
              key={i}
              placement={"right-end"}
              showArrow
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">{el?.name}</div>
                  <div className="text-tiny">Hello, How are you?</div>
                </div>
              }
              color="primary"
            >
              <div
              onClick={()=>handleChatUser(el?._id)}
                className={`flex gap-2 border-b rounded-md ${show ? "items-end" :"items-center rounded-s-3xl"} w-full h-[70px]  border-gray-400 p-1 ${
                  el._id === RecentChatData?._id && `bg-blue-400`
                }`}
              >
                <Image
                  src="/chat_user_logo.png"
                  alt="error"
                  fit
                  width={50}
                  height={50}
                />
               {show &&  <div>
                <p
                  className={`text-blue-400 text-[16px] font-semibold ${
                    el._id === RecentChatData?._id && `text-white`
                  }`}
                >
                  {el?.isGroupChat ? "Group" : el?.members[0]?.name}
                </p>
                <p
                  className={`text-gray-500 text-[14px] w-[120px] truncate ${
                    el._id === RecentChatData?._id && `text-gray-700`
                  }`}
                >
                  Hello, How are you ?
                </p>
              </div>}
              </div>
            </Tooltip>}
            </>
          );
        })}
    </div>
  );
};

export default UsersSidebar;
