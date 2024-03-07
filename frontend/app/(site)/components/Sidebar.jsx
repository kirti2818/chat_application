import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ children }) => {
  return (
    <div className="flex gap-1 h-screen w-full border p-2 bg-blue-50">
      <div className="flex flex-col items-center gap-6 w-[70px] border rounded-lg shadow-lg bg-blue-100 p-2 ">
        <div className="">
         <Link href="/"><Image src = "/user_icon.png" alt="error" fit width={45} height={45} /></Link>
        </div>
        <div>
        <Link href="/"><Image src = "/chat_logo.png" alt="error" fit width={45} height={45} /></Link>
        </div>
        <div className="text-gray-700 ">
          <Link href = "/" ><IoSettings className="w-11 h-11" /></Link>
        </div>
      </div>
      <div className="flex-1 border rounded-md shadow-lg bg-white ">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
