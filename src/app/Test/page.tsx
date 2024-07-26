'use client';
import React, { useState } from 'react';
import IncomingCall from '../Call/IncomingCall'; // Adjust the path as needed

const IncomingCallTestPage: React.FC = () => {
  const [showIncomingCall, setShowIncomingCall] = useState(false);

  const handleShowCall = () => {
    setShowIncomingCall(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Test Incoming Call Popup</h1>
      <button
        onClick={handleShowCall}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Simulate Incoming Call
      </button>

      {showIncomingCall && (
        <IncomingCall friendId="123" callerName="John Doe" />
      )}
    </div>
  );
};

export default IncomingCallTestPage;