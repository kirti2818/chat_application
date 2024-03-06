import React from "react";

const Sidebar = ({children}) => {
  return (
    <div className="flex gap-1 h-screen w-full border p-2 bg-blue-50">
      <div className="w-[70px] border rounded-lg shadow-lg bg-blue-100 "></div>
      <div className="flex-1 border rounded-md shadow-lg bg-white ">{children}</div>
    </div>
  );
};

export default Sidebar;
