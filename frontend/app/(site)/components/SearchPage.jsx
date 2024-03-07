import { Input } from "@nextui-org/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
  return (
    <div className="flex flex-col gap-5 ">
      <div>
        <Input
          size="none"
          color="primary"
          autoFocus
          endContent={
            <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          placeholder="Type To Search..."
          variant="bordered"
        />
      </div>
      <div className="flex flex-col gap-3 overflow-scroll scrollbar-hide h-[370px] pb-5">
      {[1,2,3,4,56,7,8,9].map((el)=>{
        return(
            <div className="w-full min-h-[200px] border border-red-700"></div>
        )
      })}
      </div>
    </div>
  );
};

export default SearchPage;
