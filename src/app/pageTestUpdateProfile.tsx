"use client"
import React, { useState, useEffect } from 'react';
import { IUser } from '../models/user'; // Import IUser interface
import { interests as interestOptions } from '../constants/enums'; // Import interests enum
import "../styles/globals.css";

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    userDescription: '',
    profilePic: '',
    userInterests: [],
    
  });

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      let userId = '668e1be4044e2e0a19cbe2cd';
      const userData = await (await  fetch('/api/viewProfile?userId='+userId)).json();
      setFormData({
        ...formData,
        ...userData,
        userInterests: userData.userInterests || [],
      });
    };
    fetchUserData();
  }, []);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    if (name === "userInterests") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option:any) => option.value);
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedOptions,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      let userId = '668e1be4044e2e0a19cbe2cd';

      const response = await fetch('/api/updateProfile?userId='+userId, { // Replace USER_ID with actual user ID
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      alert('Profile updated successfully!');
    } catch (err:any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto my-10">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="userDescription" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="userDescription" id="userDescription" value={formData.userDescription} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
      </div>
      <div>
      <label htmlFor="userInterests" className="block text-sm font-medium text-gray-700">Interests</label>
        <select multiple name="userInterests" id="userInterests" value={formData.userInterests} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          {interestOptions.map(interest => (
            <option key={interest} value={interest}>{interest}</option>
          ))}
        </select>
        </div>
      <div>
        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
        <input type="text" name="profilePic" id="profilePic" value={formData.profilePic} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;