import useGetAllChats from "@/libs/queries/Chat/GetAllChats";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";

const UsersSidebar = ({ RecentChatData }) => {
  const [search, setSearch] = useState();
  const {
    data: GetAllChats,
    isLoading: GetAllChatsLoading,
    isError: GetAllChatsError,
    isSuccess: GetAllChatsSuccess,
  } = useGetAllChats(search);
  console.log(RecentChatData);

  return (
    <div className="w-[200px] border rounded-lg shadow-lg bg-white p-1 h-full overflow-auto scrollbar-hide">
      {!GetAllChatsLoading &&
        !GetAllChatsError &&
        GetAllChatsSuccess &&
        GetAllChats?.map((el) => {
          return (
            <Tooltip
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
                className={`flex gap-2 items-end w-full h-[70px] border-b border-gray-400 p-1 ${
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
                <div>
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
                </div>
              </div>
            </Tooltip>
          );
        })}
    </div>
  );
};

export default UsersSidebar;
