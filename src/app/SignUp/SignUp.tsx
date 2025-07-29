"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from "next/navigation";

interface IFormData {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add state for error message
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for button disabled and loading

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  useEffect(() => {}, [errorMessage]);
  useEffect(() => {}, [isSubmitting]);

  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "password") {
      setPassword(value);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const validatePasswords = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Disable button and show spinner

    if (!validatePasswords()) {
      setErrorMessage("Passwords do not match"); // Set error message for password mismatch
      setIsSubmitting(false); // Enable button and hide spinner

      return;
    }

    try {
      const response = await fetch("/api/userprofile/userSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();

      console.log("Sign Up Success:", data.message);
      
      // Handle success (e.g., redirect to a login page or show a success message)
      localStorage?.setItem("userId", data.userId);
      router.push("/SetupProfile?userId=" + data.userId);
    } catch (error: any) {
      // Handle error (e.g., show an error message)
      console.error("Sign Up Error:", error);
      setIsSubmitting(false); // Enable button and hide spinner

      setErrorMessage(error.message); // Set error message from backend
    }
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
          Sign Up
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-4 sm:space-y-5">
            <label className="block font-light text-gray-400 text-sm">
              Name
              <input
                className="w-full p-3 sm:p-4 mt-1 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                type="text"
                onChange={handleOnChange}
                name="name"
                required
                placeholder="Enter your full name"
              />
            </label>
            
            <label className="block font-light text-gray-400 text-sm">
              Email
              <input
                className="w-full p-3 sm:p-4 mt-1 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                type="email"
                onChange={handleOnChange}
                name="email"
                required
                placeholder="Enter your email address"
              />
            </label>
            
            <label className="block font-light text-gray-400 text-sm">
              Date of Birth
              <input
                className="w-full p-3 sm:p-4 mt-1 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                type="date"
                onChange={handleOnChange}
                name="dateOfBirth"
                required
              />
            </label>
            
            <label className="block font-light text-gray-400 text-sm">
              Password
              <div className="relative">
                <input
                  className="w-full p-3 sm:p-4 mt-1 pr-12 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  onChange={handleOnChange}
                  required
                  placeholder="Create a strong password"
                />
                <i
                  className={`bi ${
                    isPasswordVisible ? "bi-eye" : "bi-eye-slash"
                  } absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>
            </label>
            
            <label className="block font-light text-gray-400 text-sm">
              Confirm Password
              <div className="relative">
                <input
                  className="w-full p-3 sm:p-4 mt-1 pr-12 border-b border-green-200 focus:bg-green-50 focus:border-green-400 outline-none transition-colors duration-200 text-black"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Confirm your password"
                />
                <i
                  className={`bi ${
                    isConfirmPasswordVisible ? "bi-eye" : "bi-eye-slash"
                  } absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors`}
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              </div>
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="w-full p-3 sm:p-4 rounded-2xl bg-[#65AD87] hover:bg-[#5a9b79] text-white font-medium text-sm sm:text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <i className="bi bi-arrow-repeat animate-spin mr-2"></i>
                Signing Up...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/Login" className="text-[#65AD87] hover:text-[#5a9b79] font-medium transition-colors duration-200">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;