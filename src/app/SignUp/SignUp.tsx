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
    <div className="sign-up-form bg-white rounded-l-2xl px-10 py-10">
      <h1 className="mb-4 font-source-code text-3xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="px-10">
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Name
            <input
              className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
              type="text"
              onChange={handleOnChange}
              name="name"
              required
            />
          </label>
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Email
            <input
              className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
              type="email"
              onChange={handleOnChange}
              name="email"
              required
            />
          </label>
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Date of Birth
            <input
              className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
              type="date"
              onChange={handleOnChange}
              name="dateOfBirth"
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
                onChange={handleOnChange}
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
          <label className="block mb-2 font-light text-gray-400 text-sm">
            Confirm Password
            <div className="relative">
              <input
                className="w-full p-2 mb-4 border-b border-green-200 focus:bg-green-100 outline-none"
                type={isConfirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                onChange={handleConfirmPasswordChange}
                required
              />
              <i
                className={`bi ${
                  isConfirmPasswordVisible ? "bi-eye" : "bi-eye-slash"
                } custom-class absolute right-2 top-2 cursor-pointer`}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
          </label>
          <div className="text-red-500 text-sm mb-2 w-fit">
            {errorMessage && errorMessage}
          </div>{" "}
          {/* Display error message */}
          <button
            className="w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-xs"
            type="submit"
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? (
              <i className="bi bi-arrow-repeat animate-spin"></i> // Show spinner
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>
      <p className="text-center mt-4 text-xs ">
        Already have an account?{" "}
        <Link href="/Login" className="text-purple-500">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;