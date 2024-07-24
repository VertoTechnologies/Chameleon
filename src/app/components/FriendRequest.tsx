import React from 'react'


 export async function addFriend(requesterId: string, recipientId: string) {
    const response = await fetch('/api/friends/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requesterId, recipientId }),
    });
    return response.json();
  }


 export async function handleFriendRequest(friendshipId: string, newStatus: string) {
    const response = await fetch('/api/friends/handleFriendRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friendshipId, newStatus }),
    });
    return response.json();
  }


export  async function getPendingFriendRequests(userId: string) {
    const response = await fetch(`/api/friends/getPendingFriendRequests?userId=${userId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
  }
    console.log(response.json)
    return response.json();
  }


export  async function getFriendsList(userId: string) {
    const response = await fetch(`/api/friends/getFriendsList?userId=${userId}`,{
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  console.log(response.json)
    return response.json();
  }

  
