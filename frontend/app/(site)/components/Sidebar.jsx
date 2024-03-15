import React from "react";
import { useMediaQuery } from "react-responsive";
import ScreenSidebar from "./ScreenSidebar";
import MobileSidebar from "./MobileSidebar";
import dynamic from "next/dynamic";

const Sidebar = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 720px) and (max-width: 1400px)",
  });
  const isPortrait = useMediaQuery({ query: "(max-width: 719px)" });
  return (
    <>
      {isDesktopOrLaptop ? (
        <ScreenSidebar>{children}</ScreenSidebar>
      ) : (
        <MobileSidebar>{children}</MobileSidebar>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Sidebar), {
  ssr: false
})
