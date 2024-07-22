import React from 'react'

const FriendRequest = (requesterId: any,recipientId: any) => {
    const sendRequest = async () => {
      const response = await fetch('/api/addFriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requesterId, recipientId })
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    
      return response.json();
    }
    }


export default FriendRequest