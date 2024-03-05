"use client";
import FormButton from "@/core/FormButton";
import useResendOTP from "@/libs/mutations/Auth/useResendOTP";
import useSignup from "@/libs/mutations/Auth/useSignUp";
import useVerifyOTP from "@/libs/mutations/Auth/useVerifyOTP";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

const EmailOtp = () => {
  const [otp, setOtp] = useState("");
  const { mutate: VerifyOTP, isLoading: VerifyOTPLoading } = useVerifyOTP();
  const { mutate: ResendOTP, isLoading: resendOtpLoading } = useResendOTP();

  return (
    <div className="flex justify-center items-center h-screen w-full bg-blue-50">
      <div className="flex flex-col items-center gap-9 h-[400px] w-[500px] border rounded-xl shadow-md bg-white p-3 py-10">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-center">
            <Image
              src="/email-logo.png"
              alt="error"
              fit
              width={100}
              height={100}
            />
          </div>
          <h1 className="text-gray-800 font-semibold text-[20px]">
            Verify your Email Address
          </h1>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-gray-900 font-semibold ">Enter OTP</p>

          <div className="flex flex-col gap-5">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<div style={{ margin: "10px" }}></div>}
              renderInput={(props) => <input {...props} />}
              isInputNum={true}
              shouldAutoFocus={true}
              inputStyle={{
                border: "2px solid #1E90FF",
                borderRadius: "8px",
                width: "54px",
                height: "54px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "#1E90FF",
              }}
            />
            <div className="flex justify-center gap-2 ">
              <Button
                isLoading={resendOtpLoading}
                onClick={() => ResendOTP()}
                radius="sm"
                className="text-[13px] bg-blue-400 text-white"
              >
                Resend OTP
              </Button>
              <Button
                isLoading={VerifyOTPLoading}
                onClick={() => VerifyOTP({ otp })}
                radius="sm"
                className="text-[13px] bg-blue-400 text-white"
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOtp;
