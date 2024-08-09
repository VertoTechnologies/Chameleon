'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import { addFriend, handleFriendRequest, getPendingFriendRequests } from './FriendApiCalls';
import { useProfile } from '../../stores/UserStore';

const FriendButton = ({ id }: any) => {
  const [buttonName, setButtonName] = useState('Add');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const profile = useProfile();

  const sendEmailNotification = async (toEmail: string, fromUserName: string) => {
    const emailText = `Ready to Connect with People?<br>${fromUserName} wants to be your New Language Buddy! Add them back and learn together.`;


    try {
      await axios.post('/api/notifications/sendfriendrequestemail', {
        toEmail,
        fromUserName,
        emailText
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
      // Optionally set an alert message for email error
    }
  };

  const handleAddFriend = async () => {
    try {
      const response = await addFriend(profile.userId, id);
      console.log('Friend request sent:', response);

      
      const recipientEmail = response.recipientEmail;
      const senderName = profile.name; // Adjust according to your profile data
     
      // Send email notification
      await sendEmailNotification(recipientEmail, senderName);
      console.log("recipients email her:" ,recipientEmail);
      setAlertMessage('Friend request sent');
      setAlertType('success');
      setButtonName('sent');
    } catch (error) {
  
      console.error('Error sending friend request:', error);
      setAlertMessage('Error sending friend request');
      setAlertType('error');
    }
  };

  // Other functions (acceptFriend, rejectFriend, pendingFriend) remain unchanged

  const closeAlert = () => {
    setAlertMessage(null);
    setAlertType(null);
  };
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 4000); // Close alert after 4 seconds

      return () => clearTimeout(timer); // Clear timeout if the component is unmounted
    }
  }, [alertMessage]);

  return (
    <div>
      {/* Display the alert message at the top with a close button */}
      {alertMessage && (
        <div
          className={`fixed top-9 left-1/2 transform -translate-x-1/2 p-4 text-center z-50 rounded-lg shadow-lg ${
            alertType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
          style={{ minWidth: "300px" }}
        >
          {alertMessage}
          <button
            onClick={closeAlert}
            className="absolute top-2 right-2 text-xl font-bold"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      )}
      <button
        className="ml-auto mr-4 text-white px-6 py-2 rounded-full"
        style={{ backgroundColor: '#65AD87', borderRadius: '30px' }}
        onClick={handleAddFriend}
      >
        {buttonName}
      </button>
      {/* Uncomment and use these buttons if needed */}
      {/* <button className='w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-sm' onClick={acceptFriend}>
        Accept
      </button>
      <button className='w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-sm' onClick={rejectFriend}>
        Reject
      </button>
      <button className='w-full p-3 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white px-1 py-2 text-sm' onClick={pendingFriend}>
        Pending
      </button> */}
    </div>
  );
};

export default FriendButton;
