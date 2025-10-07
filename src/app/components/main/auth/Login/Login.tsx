"use client";

import React, { useState } from "react";
import { Card, Typography, Space, message } from "antd";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import { loginApi, verifyOtpApi } from "@/app/services/api-services";
import {
  formatPhoneNumber,
  saveAuthToken,
  saveUserSession,
} from "@/app/utils/auth.utils";
import type { AuthError } from "@/app/types/auth.types";

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const router = useRouter();

  const handleMobileSubmit = async (mobile: string) => {
    try {
      setLoading(true);

      // Format phone number with country code
      const formattedPhoneNumber = formatPhoneNumber(mobile);

      // Call login API
      const response = await loginApi(formattedPhoneNumber);

      if (response.status === "success") {
        message.success(response.message);
        setMobileNumber(formattedPhoneNumber);
        setStep("otp");
      } else {
        message.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Failed to send OTP:", error);
      const axiosError = error as AxiosError<AuthError>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to send OTP. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleOtpSubmit = async (otp: string) => {
    try {
      setLoading(true);

      // Call verify OTP API
      const response = await verifyOtpApi(mobileNumber, otp, "seller");

      if (response.status === "success" && response.data) {
        message.success(response.message);

        // Save authentication data
        saveAuthToken(response.data.token);
        saveUserSession({
          token: response.data.token,
          role: response.data.role,
          isNewUser: response.data.is_new_user,
          phoneNumber: mobileNumber,
        });

        // Navigate to dashboard
        router.push("/admin/dashboard");
      } else {
        message.error("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      const axiosError = error as AxiosError<AuthError>;
      const errorMessage =
        axiosError.response?.data?.message || "Invalid OTP. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      // Call login API again to resend OTP
      const response = await loginApi(mobileNumber);

      if (response.status === "success") {
        message.success("New OTP sent successfully!");
      } else {
        message.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      const axiosError = error as AxiosError<AuthError>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to resend OTP. Please try again.";
      message.error(errorMessage);
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
