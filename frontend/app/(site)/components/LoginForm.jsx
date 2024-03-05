"use client";
import FormButton from "@/core/FormButton";
import FormInput from "@/core/FormInput";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import useLogin from "@/libs/mutations/Auth/useLogin";

const LoginForm = () => {
    const { control, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const {mutate : LoginUser , isLoading : LoginUserLoading , isError : LoginUserError , isSuccess:LoginUserSuccess} = useLogin()

    const onSubmit = (data) => {
      console.log(data);
      LoginUser(data)
    };

  return (
    <div className="flex justify-center w-[500px] bg-white border rounded-xl p-3 py-7">
      <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[400px]">
      <Controller
      name="email"
      control={control}
      rules = {{required : "Email is required"}}
      render={({ field: { onChange, value } }) => {
        return (
          <div>
            <FormInput onChange={onChange} value = {value} label={"Email"} />
          </div>
        );
      }}
    />
    <Controller
    name="password"
    control={control}
    rules = {{required : "Password is required"}}
    render={({ field: { onChange, value } }) => {
      return (
        <div>
          <PasswordInput type={showPassword?"text":"password"} showPassword={showPassword} setShowPassword={setShowPassword} onChange={onChange} value = {value} label={"Password"} />
        </div>
      );
    }}
  />
        <div className=" flex flex-col gap-2 items-center">
      <div className="w-full">
      <FormButton type="submit" text= "Sign In" />
      </div>
       <p className=" text-[14px] font-semibold">Or</p>
       <div className="w-full">
      <FormButton text="Continue With Google"/>
      </div>
      <p className=" text-[14px] font-semibold">Create an Account? <span><Link href={"/signup"}>SignUp</Link></span></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
