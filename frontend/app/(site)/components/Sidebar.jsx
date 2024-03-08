import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import DynamicModal from "@/core/DynamicModal";
import SearchPage from "./SearchPage";
import socket from "@/utils/Socket";

const Sidebar = ({ children }) => {
  const [OpenSearchModal, setOpenSearchModal] = useState(false);
  const [OpenMenuDropdown,setOpenMenuDropdown] = useState(false)
  return (
    <div className="flex gap-1 h-screen w-full border p-2 bg-blue-50 overflow-scroll scrollbar-hide">
      <DynamicModal
        onOpen={OpenSearchModal}
        isOpen={OpenSearchModal}
        onClose={() => setOpenSearchModal(false)}
        heading="Find User"
      >
        <SearchPage setOpenSearchModal={setOpenSearchModal} />
      </DynamicModal>
      <div className="flex flex-col items-center gap-6 w-[70px] border rounded-lg shadow-lg bg-blue-100 p-2 ">
        <div className="">
          <Tooltip placement={"right-end"} content={"User"} color="primary">
            <Link href="/">
              <Image
                src="/user_icon.png"
                alt="error"
                fit
                width={45}
                height={45}
              />
            </Link>
          </Tooltip>
        </div>
        <div>
          <Tooltip placement={"right-end"} content={"Chat"} color="primary">
            <Link href="/">
              <Image
                src="/chat_logo.png"
                alt="error"
                fit
                width={45}
                height={45}
              />
            </Link>
          </Tooltip>
        </div>

        <div className="text-gray-700 ">
          <Tooltip placement={"right-end"} content={"Setting"} color="primary">
            <Link href="/">
              <IoSettings className="w-11 h-11" />
            </Link>
          </Tooltip>
        </div>
        <div
          onClick={() => setOpenSearchModal(true)}
          className="cursor-pointer text-blue-gray-300 "
        >
          <FaSearch className="w-11 h-11" />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full gap-2  border rounded-md shadow-lg relative">
        <div className="flex justify-end items-center pr-7 w-full h-[40px] absolute border-b rounded-md  bg-blue-300">
          {" "}
          <div onClick={()=>setOpenMenuDropdown(true)}>
            <Image src="/user_icon.png" width={30} height={30} alt="error" />
          </div>{" "}
        </div>
        <div className="h-full bg-white pt-10"> {children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
