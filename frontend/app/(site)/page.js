import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center h-full items-center">
      <div>
        <div className="flex h-[50px] w-full justify-center ">
          <Image src="/messenger.png" alt="Error" width={50} height={100} fit />
        </div>

        <p className="text-3xl text-gray-900 font-bold mt-4">Sign in to your account</p>
      </div>
      <div>
        <AuthForm />
      </div>
    </div>
  );
}
