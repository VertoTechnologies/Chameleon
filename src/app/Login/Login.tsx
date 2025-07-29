"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";
import useEmailStore from "../stores/emailStore";

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for button disabled and loading
  const setUserEmail = useEmailStore((state) => state.setUserEmail);
  const userEmail = useEmailStore((state) => state.userEmail);
  const router = useRouter();
  const setOtp = useEmailStore((state) => state.setOtp);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        await axios.post("/api/notifications/sendPasswordResetEmail", {
          toEmail: userEmail,
          OTP,
        });
        router.push("/ResetPassword");
      } catch (error) {
        console.error("Error sending email notification:", error);
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
    setIsSubmitting(true); // Disable button and show spinner

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
    } catch (error: any) {
      console.error("Login Error:", error);
      setErrorMessage(error.message); // Set error message
      setIsSubmitting(false); // Re-enable button if there's an error
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="w-full bg-white rounded-lg lg:rounded-l-2xl lg:rounded-r-none p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
      {/* Mobile Logo - Only visible on mobile */}
      <div className="lg:hidden flex flex-col items-center mb-6 sm:mb-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4">
          <img
            src="/assets/images/logo.png"
            alt="Chameleon Logo"
            className="w-full h-full object-contain rounded-xl"
          />
        </div>
        <h2 className="font-source-code-pro font-bold text-lg sm:text-xl tracking-wider text-black">
          CHAMELEON
        </h2>
      </div>

      <div className="w-full max-w-md mx-auto">
        <h1 className="mb-6 sm:mb-8 font-source-code-pro text-2xl sm:text-3xl font-bold text-center lg:text-left">
          Sign In
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-4 sm:space-y-5">
            <label className="block font-light text-gray-400 text-sm">
              Email
              <input
                className="w-full p-3 sm:p-4 mt-1 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                type="email"
                name="email"
                onChange={onChange}
                required
                placeholder="Enter your email address"
              />
            </label>
            
            <label className="block font-light text-gray-400 text-sm">
              Password
              <div className="relative">
                <input
                  className="w-full p-3 sm:p-4 mt-1 pr-12 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                />
                <i
                  className={`bi ${
                    isPasswordVisible ? "bi-eye" : "bi-eye-slash"
                  } absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </label>
          </div>

          {/* Error Message and Forgot Password */}
          <div className="space-y-2">
            {errorMessage && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {errorMessage}
              </div>
            )}
            <div className="text-right">
              <Link
                href="/Login"
                onClick={() => navigateToOtp()}
                className="text-[#65AD87] hover:text-[#5a9b79] text-xs sm:text-sm font-medium transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full p-3 sm:p-4 rounded-2xl bg-[#65AD87] hover:bg-[#5a9b79] text-white font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <i className="bi bi-arrow-repeat animate-spin mr-2"></i>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/SignUp" className="text-[#65AD87] hover:text-[#5a9b79] font-medium transition-colors duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;