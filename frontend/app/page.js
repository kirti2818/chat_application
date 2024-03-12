"use client";
import { FaCamera } from "react-icons/fa";
// import { io } from "socket.io-client";
import { useEffect } from "react";
import socket from "@/utils/Socket";
import useMe from "@/libs/queries/Auth/useMe";
import { useSelector } from "react-redux";
import UsersSidebar from "./(site)/components/UsersSidebar";
import Conversation from "./(site)/components/Conversation";
import Sidebar from "./(site)/components/Sidebar";

// const socket = io("http://localhost:8080",{
//   withCredentials:true
// });

export default function Home() {
 
 
  const { data: getData, isLoading: getDataLoading } = useMe();
  const RecentChatData = useSelector((store) => store.chatSlice.RecentChatData);
  console.log(RecentChatData);

  useEffect(() => {
    if (!getDataLoading) {
      console.log("in");
      socket.emit("login", getData?._id);
    }
  }, [getDataLoading, getData]);

  useEffect(() => {
    socket.connect()
  //  socket.on("connect",(data)=>{
  //   console.log("Hellooooo")
  //  })
  //  socket.on("receieve_message",(Data)=>{
  //   console.log(Data,"RECEIVE MESSAG")
  //  })
  
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <Sidebar>
        <div className="flex gap-1 h-full w-full border  bg-blue-50">
          <UsersSidebar RecentChatData={RecentChatData} />
          <Conversation RecentChatData={RecentChatData} />
        </div>
      </Sidebar>
    </div>
  );
}
