import useGetSingleChats from "@/libs/queries/Chat/useGetSingleChat";
import { Button, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import socket from "@/utils/Socket";
import useMe from "@/libs/queries/Auth/useMe";

const Conversation = ({ RecentChatData }) => {
  console.log(RecentChatData);
  const [message, setMessage] = useState();
  const {
    data: getSingleChat,
    isLoading: getSingleChatLoading,
    isError: getSingleChatError,
    isSuccess: getSingleChatSuccess,
  } = useGetSingleChats(RecentChatData?._id);
  const { data: getMyData } = useMe();

  const handleMessageChange = async (event) => {
    console.log(event.target.value);
    setMessage(event.target.value);
    socket.emit("typing", getSingleChat);
  };

  const handleSendMessage = async () => {
    const data = {
      recepientIds: getSingleChat[0]?.members,
      chatId: getSingleChat[0]?._id,
      content: message,
      sender: getMyData?._id,
    };
    console.log(data);
    socket.emit("send_new_message", data);
  };

  useEffect(()=>{
    // socket.on("send_new_message",(data)=>{
    //   console.log(data)
    // })
  },[])

  return (
    <div className="flex-1 flex relative h-full border rounded-md shadow-lg bg-white ">
      {!getSingleChatError &&
      !getSingleChatLoading &&
      getSingleChatSuccess &&
      getSingleChat.length > 0 ? (
        <>
          <div className="flex gap-2 absolute top-0 items-end w-full h-[60px]  p-1 bg-blue-50">
            <Image
              src="/chat_user_logo.png"
              alt="error"
              fit
              width={50}
              height={50}
            />
            <div className="w-full ">
              <p className="text-blue-400 text-[16px] font-semibold">
                {getSingleChat[0]?.members[0]?.name}
              </p>
              <p className="text-gray-500 text-[14px] ">
                Last seen at 11:30 pm
              </p>
            </div>
          </div>
          <div className="pt-20 px-2 pb-14  w-full h-full overflow-auto scrollbar-hide ">
            <div className="flex flex-col gap-2">
              {[1, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2].map((el) => {
                if (el == 1) {
                  return (
                    <div className=" flex w-[100px] pl-2">
                      {" "}
                      <p
                        className="border rounded-md bg-blue-300 text-white text-[18px] p-1 max-w-[350px]"
                        style={{ overflowWrap: "break-word" }}
                      >
                        suorertyuiopityresuhjikoplkjhfdsfghjkl;,mnbvccvbnm,./mnbvcsdfgoiytewertyuioiouytrewrtyuioiuytretyuioknbvcxnm,
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div className=" w-full flex justify-end pr-2">
                      {" "}
                      <p
                        className="border rounded-md bg-gray-200 text-gray-500 text-[18px] p-1 max-w-[350px]"
                        style={{ overflowWrap: "break-word" }}
                      >
                        suorertyuiopityresuhjikoplkjhfdsfghjkl;,mnbvccvbnm,./mnbvcsdfgoiytewertyuioiouytrewrtyuioiuytretyuioknbvcxnm,
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="flex absolute bg-blue-100 w-full h-[50px] border rounded-2xl bottom-0 px-2 py-1">
            <div className="h-full text-gray-600 w-[50px] flex items-center">
              <FaCamera className="h-7 w-7" />
            </div>
            <div className="flex-1 relative">
              <Input
                radius="sm"
                className="absolute w-full h-full "
                size={"none"}
                onChange={(e) => handleMessageChange(e)}
                variant=""
                placeholder="Type a message"
              />
            </div>
            <div className="h-full text-gray-600 w-[100px] flex justify-end">
              <Button
                type="submit"
                onClick={() => handleSendMessage()}
                radius="sm"
                className="bg-blue-400 text-white"
              >
                Send
              </Button>
            </div>
          </div>
        </>
      ) : !getSingleChatError && getSingleChatLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center font-semibold text-[20px]">
          Start Conversation
        </div>
      )}
    </div>
  );
};

export default Conversation;
