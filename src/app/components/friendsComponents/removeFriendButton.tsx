import React, { useState } from 'react';
import { useProfile } from '@/app/stores/UserStore';

interface RemoveFriendButtonProps {
    id: string;
  }

const RemoveFriendButton: React.FC<RemoveFriendButtonProps> = ({ id }) => {
  const profile = useProfile();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  async function removeFriend(requesterId: string, recipientId: string) {
    try {
      const response = await fetch('/api/friends/removeFriend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requesterId, recipientId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('Error removing friend:', error);
      throw error;
    }
  }

  const handleRemoveFriend = async () => {
    try {
      const response = await removeFriend(profile.userId, id);
      console.log('Friend removed:', response);
      setAlertMessage('Friend removed');
      setAlertType('success');
    } catch (error) {
      console.error('Error removing friend:', error);
      setAlertMessage('Error removing friend');
      setAlertType('error');
    }
  };

  const closeAlert = () => {
    setAlertMessage(null);
    setAlertType(null);
  };

  return (
    <div>
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
        onClick={handleRemoveFriend}
      >
        Remove Friend
      </button>
    </div>
  );
};

export default RemoveFriendButton;
