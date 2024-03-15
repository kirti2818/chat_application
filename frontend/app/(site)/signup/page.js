import Image from "next/image";
import { Input } from "@nextui-org/react";
import AuthForm from "../components/AuthForm";

const SignUp = () => {
  return (
    <div className="flex flex-col gap-5 py-4 h-screen overflow-scroll scrollbar-hide items-center bg-blue-50">
    <div className="">
      <div className="flex  sm:h-[50px] w-full justify-center ">
        <Image src="/messenger.png" alt="Error" width={50} height={100} fit />
      </div>

      <p className=" text-lg sm:text-2xl text-gray-900 font-bold mt-4">Sign Up to your account</p>
    </div>
    <div className="flex-1">
      <AuthForm />
    </div>
  </div>
  )
}

export default SignUp
