"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

const PasswordInput = ({
  placeholder,
  disabled,
  label,
  size = "none",
  onChange,
  value,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <p className="text-gray-900 font-semibold">{label}</p>
      <Input
        endContent={
          showPassword ? (
            <div
              onClick={() => setShowPassword(false)}
              className="cursor-pointer"
            >
              <FaEye />
            </div>
          ) : (
            <div
              onClick={() => setShowPassword(true)}
              className="cursor-pointer"
            >
              <IoIosEyeOff />
            </div>
          )
        }
        onChange={onChange}
        value={value}
        size={size}
        className="w-full"
        variant="bordered"
        radius="sm"
        color="primary"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default PasswordInput;
