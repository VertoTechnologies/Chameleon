"use client";

import Link from "next/link";
import React, { useState } from "react";
import axios from 'axios'; 
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import useEmailStore from '../stores/emailStore';

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const setUserEmail = useEmailStore((state) => state.setUserEmail);
  const userEmail = useEmailStore((state) => state.userEmail);
  const router = useRouter();
  const setOtp = useEmailStore((state) => state.setOtp);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const navigateToOtp = async () => {
    const email = formData.email;
    if (/^\S+@\S+\.\S+$/.test(email)) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOtp(OTP.toString());

      try {
        await axios.post('/api/notifications/sendPasswordResetEmail', {
          toEmail: userEmail,
          OTP,
        });
        router.push('/ResetPassword')
      } catch (error) {
        console.error('Error sending email notification:', error);
        // Optionally set an alert message for email error
      }
    } else {
      alert("Please enter your email");
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUserEmail(value);
    handleChange(e);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/userprofile/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login Success:", data.message);
        localStorage?.setItem("userId", data.userId);
        router.push("/Dashboard");
      } else {
        throw new Error(data.message || "Login failed");
      }
      
    } catch (error) {
      console.error("Login Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="sign-up-form bg-white rounded-2xl px-10 py-10 w-full max-w-lg h-auto lg:w-1/2 lg:h-3/4 mx-auto my-10">
      <h1 className="mb-4 font-source-code text-3xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="px-10">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Email
            <input
              className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
              type="email"
              name="email"
              onChange={onChange}
              required
            />
          </label>
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Password
            <div className="relative">
              <input
                className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                required
              />
              <i
                className={`bi ${
                  isPasswordVisible ? "bi-eye" : "bi-eye-slash"
                } custom-class absolute right-2 top-2 cursor-pointer`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </label>
          <div className="flex justify-between items-center mb-4">
            <label className="flex text-xxs text-gray-400">
              <input type="checkbox" className="mr-2 text-xxs" />
              Remember me
            </label>
            {/* <Link href="/ResetPassword" className="text-purple-500 text-xxs">
              Forgot Password?
            </Link> */}
            <Link href='/Login' onClick={()=> navigateToOtp()} className="text-purple-500 text-xxs">Forgot Password?

            </Link>
          </div>
          <button
            className="w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-xs"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className="text-center mt-4 text-xs">
        Don't have an account?{" "}
        <Link href="/SignUp" className="text-purple-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
