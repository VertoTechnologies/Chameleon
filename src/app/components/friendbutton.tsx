'use client'

import React, { useState } from 'react'
import { addFriend, handleFriendRequest, getPendingFriendRequests } from './FriendRequest'
import { useProfile } from './slaystore'

const FriendButton = ({ id }: any) => {
  const [buttonName, setButtonName] = useState('Add')
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const profile = useProfile()

  const handleAddFriend = async () => {
    try {
      const response = await addFriend(profile.userId, id);
      console.log('Friend request sent:', response);
      setAlertMessage('Friend request sent');
      setAlertType('success');
      setButtonName('sent')
    } catch (error) {
      console.error('Error sending friend request:', error);
      setAlertMessage('Error sending friend request');
      setAlertType('error');
    }
  };

  const acceptFriend = async () => {
    try {
      const response = await handleFriendRequest('669f490a929cb2b2ef3dda99', 'accepted');
      console.log('Friend request accepted:', response);
      setAlertMessage('Friend request accepted');
      setAlertType('success');
    } catch (error) {
      console.error('Error accepting friend request:', error);
      setAlertMessage('Error accepting friend request');
      setAlertType('error');
    }
  };

  const rejectFriend = async () => {
    try {
      const response = await handleFriendRequest('669f490a929cb2b2ef3dda99', 'rejected');
      console.log('Friend request rejected:', response);
      setAlertMessage('Friend request rejected');
      setAlertType('success');
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      setAlertMessage('Error rejecting friend request');
      setAlertType('error');
    }
  };

  const pendingFriend = async () => {
    try {
      const response = await getPendingFriendRequests('lyi9wd48h8q8dfz2');
      console.log('Pending friend requests:', response);
      setAlertMessage('Pending friend requests fetched');
      setAlertType('success');
    } catch (error) {
      console.error('Error fetching pending friend requests:', error);
      setAlertMessage('Error fetching pending friend requests');
      setAlertType('error');
    }
  };

  const closeAlert = () => {
    setAlertMessage(null);
    setAlertType(null);
  };

  return (
    <div>
      {/* Display the alert message at the top with a close button */}
      {alertMessage && (
        <div className={`fixed top-0 left-0 right-0 p-4 text-center z-50 ${alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {alertMessage}
          <button
            onClick={closeAlert}
            className="absolute top-2 right-2 text-xl font-bold"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
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
}

export default FriendButton;
