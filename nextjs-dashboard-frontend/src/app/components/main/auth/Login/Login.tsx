import React from "react";

const Login = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/login/loginbanner.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 sm:px-20 gap-16">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default Login;
