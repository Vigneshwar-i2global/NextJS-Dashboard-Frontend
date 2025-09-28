"use client";

import React, { useState } from "react";
import { Card, Typography, Space, message } from "antd";
import { useRouter } from "next/navigation";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();

  const handleMobileSubmit = async (mobile: string) => {
    try {
      setLoading(true);
      setMobileNumber(mobile);
      console.log("Sending OTP to:", mobile);
      setStep("otp");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      message.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    try {
      setLoading(true);

      if (otp === "1234") {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      message.error("Invalid OTP, try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      message.success("New OTP sent!");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      message.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMobile = () => {
    setStep("mobile");
    setMobileNumber("");
  };

  return (
    <div
      className="min-h-screen w-full flex"
      style={{
        background: "linear-gradient(135deg, #5a189a 0%, #1e0834 100%)",
      }}
    >
      <div className="hidden md:flex w-1/2 items-center justify-center text-white px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">CRISPYMINDS</h1>
          <p className="text-lg">
            Welcome to our platform. Please login to continue.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
        <Card className="w-full max-w-md shadow-2xl border-0 rounded-xl backdrop-blur-sm bg-white/90">
          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Title level={3} className="text-xl font-semibold">
                Login to your account
              </Title>
              <p>
                {step === "mobile"
                  ? "Enter your mobile number to receive OTP"
                  : `Enter the OTP sent to ${mobileNumber}`}
              </p>
            </div>

            {step === "mobile" ? (
              <SendOtp loading={loading} onSubmit={handleMobileSubmit} />
            ) : (
              <VerifyOtp
                loading={loading}
                mobileNumber={mobileNumber}
                onSubmit={handleOtpSubmit}
                onResend={handleResendOtp}
                onBack={handleBackToMobile}
              />
            )}
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Login;
