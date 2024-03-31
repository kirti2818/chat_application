import useGetSingleChats from "@/libs/queries/Chat/useGetSingleChat";
import { Button, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import socket from "@/utils/Socket";
import useMe from "@/libs/queries/Auth/useMe";
import { useDispatch, useSelector } from "react-redux";
import { AddChatMessageData, RemoveChatMessageData } from "@/Slices/User.Slice";
import useGetAllMessage from "@/libs/queries/Message/useGetAllMessage";

const Conversation = ({ RecentChatData }) => {
  const dispatch = useDispatch();
  console.log(RecentChatData);
  const [allMessages, setAllMessages] = useState([]);
  const [messagesToShow,setMessagesToShow] = useState([])
  const [initialMessagesFetched, setInitialMessagesFetched] = useState(false);
  const RecievedAllMessage = useSelector(
    (store) => store.chatSlice.ChatMessageData
  );
  const {
    data: getAllMessage,
    isLoading: getAllMessageLoading,
    isError: getAllMessageError,
    isSuccess: getAllMessageSuccess,
  } = useGetAllMessage({ chatId: RecentChatData?._id });
  console.log(getAllMessage, "GETALLMESSAGE");
  console.log(RecievedAllMessage, "09876543234567", allMessages);
  const [message, setMessage] = useState();
  const {
    data: getSingleChat,
    isLoading: getSingleChatLoading,
    isError: getSingleChatError,
    isSuccess: getSingleChatSuccess,
  } = useGetSingleChats(RecentChatData?._id);
  const {
    data: getMyData,
    isLoading: getMyDataLoading,
    isError: getMyDataError,
    isSuccess: getMyDataSuccess,
  } = useMe();
  console.log(getAllMessageSuccess)

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
    dispatch(AddChatMessageData(data));
    setMessage("");
  };

  const handleData = async (data) => {
    console.log(data, RecentChatData);
    if (data?.chatId == RecentChatData?._id) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    socket.connect();
    console.log("in conversation");
    socket.on("receieve_message", (data) => {
      console.log(data?.content, "received message");
      dispatch(AddChatMessageData(data));
      // console.log(RecentChatData);
      // setAllMessages((prevMessages) => [
      //   ...prevMessages,
      //   { content: data?.content, sender: data?.sender },
      // ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {

    if (RecentChatData && RecievedAllMessage && initialMessagesFetched) {
      console.log("hello", RecievedAllMessage.length);
      const filteredMessages = RecievedAllMessage.filter(
        (message) => message?.chatId === RecentChatData?._id
      );
      console.log(filteredMessages.length);
      console.log(allMessages.length)
      setMessagesToShow([...allMessages,...filteredMessages]);
    }
  }, [RecievedAllMessage, RecentChatData,initialMessagesFetched]);

  useEffect(()=>{
    if(RecentChatData){
      console.log("recent chat data",RecentChatData)
      
      setInitialMessagesFetched(false)
     
    }

  },[RecentChatData])

  useEffect(() => {
    if (getAllMessage && getAllMessageSuccess && !initialMessagesFetched) {
      console.log("hey",getAllMessage.length)
      setAllMessages([]);
      setMessagesToShow([])
      dispatch(RemoveChatMessageData())
      setAllMessages(getAllMessage);
      setInitialMessagesFetched(true);
    }
  }, [getAllMessageSuccess, initialMessagesFetched]);

  console.log(messagesToShow, "MESSAGES",initialMessagesFetched,allMessages)

  return (
    <div className="flex-1 flex h-full relative border rounded-md shadow-lg bg-white ">
      {!getSingleChatError &&
      !getSingleChatLoading &&
      getSingleChatSuccess &&
      !getMyDataLoading &&
      getMyDataSuccess &&
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
          <div className="pt-20 px-2 pb-14  w-full h-full overflow-auto ">
            <div className="flex flex-col gap-2">
              {messagesToShow?.map((el, i) => {
                if (el.sender !== getMyData?._id) {
                  return (
                    <div key={i} className=" flex  pl-2">
                      {" "}
                      <p
                        className="border rounded-md bg-blue-300 text-white text-[18px] p-1 max-w-[350px]"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {el.content}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={i} className=" w-full  flex justify-end pr-2">
                      {" "}
                      <p
                        className="border rounded-md bg-gray-200 text-gray-500 text-[18px] p-1 max-w-[350px]"
                        style={{ overflowWrap: "break-word" }}
                      >
                        {el.content}
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
                isRequired
                radius="sm"
                className="absolute w-full h-full "
                size={"none"}
                onChange={(e) => handleMessageChange(e)}
                value={message}
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
