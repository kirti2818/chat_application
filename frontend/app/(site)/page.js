import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { Button, Input } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import { FaCamera } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Sidebar>
        <div className="flex gap-1 h-full w-full border  bg-blue-50">
          <div className="w-[200px] border rounded-lg shadow-lg bg-white "></div>
          <div className="flex-1 flex justify-center items-center relative h-full border rounded-md shadow-lg bg-white ">
            <div>
              <p>Start New Conversation</p>
            </div>
            <div className="flex absolute bg-blue-100 w-full h-[50px] border rounded-2xl bottom-0 px-3 py-1">
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
              <Button radius="sm" className="bg-green-300 text-white">Send</Button>
            </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
