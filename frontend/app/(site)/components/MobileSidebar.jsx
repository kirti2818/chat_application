import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Input, Tooltip } from "@nextui-org/react";
import DynamicModal from "@/core/DynamicModal";
import SearchPage from "./SearchPage";
import socket from "@/utils/Socket";
import { IoIosNotifications, IoMdHome } from "react-icons/io";

const MobileSidebar = ({ children }) => {
  const [OpenSearchModal, setOpenSearchModal] = useState(false);
  const [OpenMenuDropdown, setOpenMenuDropdown] = useState(false);
  return (
    <div className="flex flex-col gap-1 h-screen w-full relative border p-2 bg-blue-50 overflow-scroll scrollbar-hide">
      <DynamicModal
        onOpen={OpenSearchModal}
        isOpen={OpenSearchModal}
        onClose={() => setOpenSearchModal(false)}
        heading="Find User"
      >
        <SearchPage setOpenSearchModal={setOpenSearchModal} />
      </DynamicModal>

      <div className="flex justify-between z-50 items-center gap-2 w-full h-[60px] sticky top-0 border rounded-lg shadow-lg bg-gradient-to-t from-blue-300 to-blue-50 p-2 ">
      <div className="cursor-pointer text-blue-gray-300 ">
        <Tooltip placement={"bottom"} content={"Chat"} color="primary">
          <Link href="/">
            <IoMdHome className="w-8 h-8" />
          </Link>
        </Tooltip>
      </div>

     
      <div>
        <Tooltip placement={"bottom"} content={"Chat"} color="primary">
          <Link href="/">
            <Image
              src="/chat_logo.png"
              alt="error"
              fit
              width={40}
              height={40}
            />
          </Link>
        </Tooltip>
      </div>

        <div
          onClick={() => setOpenSearchModal(true)}
          className="cursor-pointer text-blue-gray-300 "
        >
          <Input size="none" placeholder="Search" startContent={<FaSearch/>}/>
        </div>

        <div className="text-gray-700 ">
          <Tooltip
          placement={"bottom"}
            content={"Notification"}
            color="primary"
          >
            <Link href="/">
              <IoIosNotifications className="w-8 h-8 text-brown-600" />
            </Link>
          </Tooltip>
        </div>
      

      <div onClick={() => setOpenMenuDropdown(true)}>
        <Image src="/user_icon.png" width={40} height={40} alt="error" />
      </div>{" "}
    </div>

      <div className="flex flex-col flex-1 gap-2 border rounded-md shadow-lg">
        <div className="h-full bg-white "> {children}</div>
      </div>

      
      
    </div>
  );
};

export default MobileSidebar;
