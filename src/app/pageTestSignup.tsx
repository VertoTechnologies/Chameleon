"use client"
import React, { useState } from 'react';
import { interests } from '../constants/enums'; // Adjust the import path as necessary
import "../styles/globals.css";
const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
    userDescription: '',
    profilePic: '',
    userInterests: [],
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === 'userInterests') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [...prevFormData.userInterests, value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('/api/userSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Sign Up Success:', data.message);
      // Handle success (e.g., redirect to a login page or show a success message)
    } catch (error) {
      console.error('Sign Up Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} />
      <input type="text" name="userDescription" placeholder="Description" onChange={handleChange} />
      <input type="text" name="profilePic" placeholder="Profile Picture URL" onChange={handleChange} />
      
      <select name="userInterests" onChange={handleChange} multiple className="mt-4">
        {interests.map((interest) => (
          <option key={interest} value={interest}>{interest}</option>
        ))}
      </select>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Sign Up</button>
    </form>
  );
};

export default Page;