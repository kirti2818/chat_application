import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react'

const UsersSidebar = () => {
  return (
    <div className="w-[200px] border rounded-lg shadow-lg bg-white p-1 h-full overflow-auto scrollbar-hide">
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 5, 6, 66, , 6, 6, 6].map((el) => {
              return (
                <Tooltip
                placement={"right-end"}
                showArrow
                content={
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">User</div>
                    <div className="text-tiny">Hello, How are you?</div>
                  </div>
                }
                color="primary">
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
                </Tooltip>
              );
            })}
          </div>
  )
}

export default UsersSidebar
