"use client";
import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { Button, Input } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import { FaCamera } from "react-icons/fa";
import { io } from "socket.io-client";
import { useEffect } from "react";
import socket from "@/utils/Socket";
import useMe from "@/libs/queries/Auth/useMe";

export default function Home() {
  const { data: getData, isLoading: getDataLoading } = useMe();
  console.log(getData);

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
          <div className="w-[200px] border rounded-lg shadow-lg bg-white p-1 h-full overflow-auto scrollbar-hide">
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 5, 6, 66, , 6, 6, 6].map((el) => {
              return (
                <div className="flex gap-2 items-end w-full h-[70px] border-b border-gray-400 p-1">
                  <Image
                    src="/chat_user_logo.png"
                    alt="error"
                    fit
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="text-blue-400 text-[16px] font-semibold">
                      User
                    </p>
                    <p className="text-gray-500 text-[14px] w-[120px] truncate ">
                      Hello, How are you ?
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-1 flex relative h-full border rounded-md shadow-lg bg-white ">
            <div className="flex gap-2 absolute top-0 items-end w-full h-[60px]  p-1 bg-blue-50">
              <Image
                src="/chat_user_logo.png"
                alt="error"
                fit
                width={50}
                height={50}
              />
              <div className="w-full ">
                <p className="text-blue-400 text-[16px] font-semibold">User</p>
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
                   <div className=" flex w-[100px] pl-2"> <p className="border rounded-md bg-blue-300 text-white text-[18px] p-1 max-w-[350px]" style={{  overflowWrap: "break-word"}}>
                 suorertyuiopityresuhjikoplkjhfdsfghjkl;,mnbvccvbnm,./mnbvcsdfgoiytewertyuioiouytrewrtyuioiuytretyuioknbvcxnm,
                 </p>
                  
                </div>
                  );
                } else {
                  return(<div className=" w-full flex justify-end pr-2"> <p className="border rounded-md bg-gray-200 text-gray-500 text-[18px] p-1 max-w-[350px]" style={{  overflowWrap: "break-word"}}>
                  suorertyuiopityresuhjikoplkjhfdsfghjkl;,mnbvccvbnm,./mnbvcsdfgoiytewertyuioiouytrewrtyuioiuytretyuioknbvcxnm,
                </p></div>)
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
                  variant=""
                  placeholder="Type a message"
                />
              </div>
              <div className="h-full text-gray-600 w-[100px] flex justify-end">
                <Button radius="sm" className="bg-blue-400 text-white">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
