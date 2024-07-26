'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface IncomingCallProps {
  friendId: string;
  callerName: string;
}

const IncomingCall: React.FC<IncomingCallProps> = ({ friendId, callerName }) => {
  const router = useRouter();

  const handleAnswer = () => {
    router.push(`/Call?friendId=${friendId}`);
  };

  const handleDecline = () => {
    router.push('/'); 
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 flex justify-center items-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative mt-[-5rem]">
        <h2 className="text-lg font-bold mb-4">{callerName} is calling...</h2>
        <img 
          src="/assets/extras/profilepicture.png" // Replace with actual path
          alt="Caller"
          className="mx-auto w-24 h-24 rounded-full mb-4"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleAnswer}
            className="bg-[#65ad87] text-white py-2 px-4 rounded-lg"
          >
            Answer
          </button>
          <button
            onClick={handleDecline}
            className="bg-[#DE3B46] text-white py-2 px-4 rounded-lg"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCall;