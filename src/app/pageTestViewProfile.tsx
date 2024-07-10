"use client"
import React, { useState, useEffect } from 'react';
import { IUser } from './models/user'; // Import IUser interface
import "../styles/globals.css";

const UserProfileComponent = () => {
  const [profile, setProfile] = useState<IUser | null>(null); // Use IUser for typing the profile state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let userId = '668e1be4044e2e0a19cbe2cd';

        const response = await fetch('/api/viewProfile?userId='+userId); // Replace USER_ID with actual user ID
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data: IUser = await response.json(); // Ensure the data matches the IUser interface
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Email: {profile.email}</p>
          <p>Name: {profile.name}</p>
          <p>Date of Birth: {new Date(profile.dateOfBirth).toLocaleDateString('en-GB')}</p>
          <p>Description: {profile.userDescription}</p>
          <p>Interests: {profile.userInterests.join(', ')}</p>
          
          <img src={profile.profilePic} alt="Profile Picture" width={200} height={200} />
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
};

export default UserProfileComponent;