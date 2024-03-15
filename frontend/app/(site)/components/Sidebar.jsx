import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import DynamicModal from "@/core/DynamicModal";
import SearchPage from "./SearchPage";
import socket from "@/utils/Socket";
import { IoIosNotifications } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import ScreenSidebar from "./ScreenSidebar";
import MobileSidebar from "./MobileSidebar";

const Sidebar = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 720px) and (max-width: 1400px)",
  });
  const isPortrait = useMediaQuery({ query: "(max-width: 719px)" });
  return (
    <>
      {isDesktopOrLaptop ? (
        <ScreenSidebar children={children} />
      ) : (
        <MobileSidebar children={children} />
      )}
    </>
  );
};

export default Sidebar;
