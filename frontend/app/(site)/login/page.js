import Image from "next/image";
import { Input } from "@nextui-org/react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col gap-5 justify-center h-screen items-center bg-blue-50">
      <div>
        <div className="flex h-[50px] w-full justify-center ">
          <Image src="/messenger.png" alt="Error" width={50} height={100} fit />
        </div>

        <p className="text-2xl text-gray-900 font-bold mt-4">
          Sign In to your account
        </p>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
