import { AddOtherMemberId } from "@/Slices/User.Slice";
import useCreateChat from "@/libs/mutations/Chat/useCreateChat";
import useMe from "@/libs/queries/Auth/useMe";
import useGetAllChats from "@/libs/queries/Chat/GetAllChats";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

const UsersSidebar = ({ RecentChatData, setOpenSearchModal }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 720px) and (max-width: 1400px)",
  });
  const [search, setSearch] = useState();
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const {
    mutate: CreateChat,
    isLoading: CreateChatLoading,
    isError: CreateChatLoadingError,
    isSuccess: CreateChatSuccess,
  } = useCreateChat();
  const {
    data: getMyData,
    isLoading: getMyDataLoading,
    isError: getMyDataError,
    isSuccess: getMyDataSuccess,
  } = useMe();
  const {
    data: GetAllChats,
    isLoading: GetAllChatsLoading,
    isError: GetAllChatsError,
    isSuccess: GetAllChatsSuccess,
  } = useGetAllChats(search);

  console.log(GetAllChats);

  const handleChatUser = async (id) => {
    dispatch(AddOtherMemberId(id));
    CreateChat({ OtherMemberId: id });
  };

  console.log(RecentChatData);

  return (
    <div
      className={`${
        show ? "max-w-[200px]" : "max-w-[60px]"
      } border rounded-lg relative shadow-lg bg-white h-full overflow-auto scrollbar-hide flex flex-col gap-1`}
    >
      <div className="absolute right-1">
        {show ? (
          <FaArrowCircleLeft
            onClick={() => setShow(false)}
            className="h-6 w-6 text-blue-500 "
          />
        ) : (
          <FaArrowCircleRight
            onClick={() => setShow(true)}
            className="h-6 w-6 text-blue-500 "
          />
        )}
      </div>
      <div className="mt-7">
        {!GetAllChatsLoading &&
          !GetAllChatsError &&
          GetAllChatsSuccess &&
          !getMyDataLoading &&
          !getMyDataError &&
          getMyDataSuccess &&
          GetAllChats?.map((el, i) => {
            return (
              <>
                {el?.latestMessage && (
                  <Tooltip
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
                      onClick={() => handleChatUser(el?.members[0]?._id)}
                      className={`flex gap-2 border-b rounded-md ${
                        show ? "items-end" : "items-center rounded-s-3xl"
                      } w-full h-[70px]  border-gray-400 p-1 ${
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
                      {show && (
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
                              el._id === RecentChatData?._id && `text-white`
                            }`}
                          >
                            {el?.latestMessage?.sender === getMyData?._id
                              ? `You : ${el?.latestMessage?.content}`
                              : el?.latestMessage?.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </Tooltip>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default UsersSidebar;
