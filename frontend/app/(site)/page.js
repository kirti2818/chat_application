"use client";
import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { Button, Input, Tooltip } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import { FaCamera } from "react-icons/fa";
import { io } from "socket.io-client";
import { useEffect } from "react";
import socket from "@/utils/Socket";
import useMe from "@/libs/queries/Auth/useMe";
import UsersSidebar from "./components/UsersSidebar";
import Conversation from "./components/Conversation";

export default function Home() {
  const { data: getData, isLoading: getDataLoading } = useMe();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect to server");
    });
    if (!getDataLoading) {
      console.log("in");
      socket.emit("login", getData?._id);
    }
  }, [getDataLoading, getData]);

  return (
    <div>
      <Sidebar>
        <div className="flex gap-1 h-full w-full border  bg-blue-50">
          <UsersSidebar />
          <Conversation />
        </div>
      </Sidebar>
    </div>
  );
}
