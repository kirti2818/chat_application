"use client";
import FormButton from "@/core/FormButton";
import FormInput from "@/core/FormInput";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import useSignup from "@/libs/mutations/Auth/useSignUp";
import {useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

const AuthForm = () => {
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const {mutate : CreateUser , isLoading : CreateUserLoading , isError : CreateUserError , isSuccess:CreateUserSuccess} = useSignup()

  const onSubmit = (data) => {
    console.log(data);
    CreateUser(data)
  };
  useEffect(()=>{
    if(CreateUserSuccess){
      router.push("/email-otp")
    }

  },[CreateUserSuccess])
  return (
    <div className="flex justify-center w-[300px] sm:w-[500px] bg-white border rounded-xl p-1 py-5 sm:p-3 sm:py-7">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[250px] sm:w-[400px]"
      >
      <Controller
          name="name"
          control={control}
          rules = {{required : "Name is required"}}
          render={({ field: { onChange, value } }) => {
            return (
              <div>
                <FormInput onChange={onChange} value = {value} label={"Name"} />
              </div>
            );
          }}
        />
        <Controller
          name="user_name"
          control={control}
          rules = {{required : "User Name is required"}}
          render={({ field: { onChange, value } }) => {
            return (
              <div>
                <FormInput onChange={onChange} value = {value} label={"User Name"} />
              </div>
            );
          }}
        />
        <Controller
        name="email"
        control={control}
        rules = {{required : "Email is required"}}
        render={({ field: { onChange, value } }) => {
          return (
            <div>
              <FormInput type="email" onChange={onChange} value = {value} label={"Email"} />
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
            <FormButton type = "submit" text="Sign Up" />
          </div>
          <p className=" text-[14px] font-semibold">Or</p>
          <div className="max-w-full flex gap-1 ">
          <div className="w-[200px]">
            <Link href="http://localhost:8080/api/auth/google">
              <FormButton startContent={<FaGoogle className="h-4 w-4" />} />
            </Link>
          </div>
          <div className="w-[200px]">
            <Link href="http://localhost:8080/api/auth/google">
              <FormButton startContent={<FaGithub className="h-4 w-4" />} />
            </Link>
          </div>
        </div>
          <p className="text-[12px] sm:text-[14px] font-semibold">
            Already Have Account?{" "}
            <span>
              <Link href={"/login"}>Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
