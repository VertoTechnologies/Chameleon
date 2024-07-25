'use client';
import React, { useEffect, useState } from 'react';
import Frame from './frame'; // Ensure the correct path based on your project structure
import { FaMicrophoneSlash, FaVideoSlash } from 'react-icons/fa'; // Importing icons
import { HiMicrophone } from 'react-icons/hi';
import { MdCallEnd } from 'react-icons/md';
import { useProfile } from '../components/slaystore'; // Ensure the correct path
import { useRouter } from 'next/navigation';

interface CallProps {
  friendId: string | null;
}

const Call: React.FC<CallProps> = ({ friendId }) => {
  const [receiver, setReceiver] = useState({
    profilePicture: '/assets/extras/profilepicture.png',
    userName: 'Receiver Name'
  }); 
  const [isMuted, setIsMuted] = useState(false); 
  const [isRinging, setIsRinging] = useState(true); // State to track if the call is ringing
  const [callDuration, setCallDuration] = useState(0); // State to track call duration
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Timer state

  const router = useRouter();
  const caller = useProfile(); // Get the caller's profile from the hook

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const response = await fetch(`/api/viewProfile?userId=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setReceiver({
          profilePicture: data.profilePic || '/assets/extras/profilepicture.png',
          userName: data.name || 'Receiver Name'
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setReceiver({
          profilePicture: '/assets/extras/profilepicture.png',
          userName: 'Receiver Name'
        });
      }
    };

    if (friendId) {
      fetchUser(friendId);
    }
  }, [friendId]);

  useEffect(() => {
    if (!isRinging && !timer) {
      const newTimer = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1);
      }, 1000);
      setTimer(newTimer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRinging, timer]);

  const handleMute = () => {
    setIsMuted(!isMuted); 
  };

  const handleVideo = () => {
    // Video logic here
  };

  const handleEndCall = () => {
    router.push(`/Chat?friend=${friendId}`);
  };

  const handleCallAnswered = () => {
    setIsRinging(false); // Call has been answered
  };

  return (
    <div
      className="flex flex-col h-[750px] rounded-lg shadow-lg relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/extras/Background.png')",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(101,173,135,0.3)]"></div> {/* Overlay */}
      
      {/* Ringing Indicator */}
      {isRinging && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-base px-4 py-2 rounded-full mt-16">
          Ringing...
        </div>
      )}

      <div className="relative flex flex-row h-full justify-center items-center space-x-8">
        {/* Caller Frame */}
        <Frame
          profilePicture={ '/assets/extras/profilepicture.png'}
          userName={caller.name || 'Caller Name'}
        />

        {/* Receiver Frame */}
        <Frame
          profilePicture={receiver.profilePicture}
          userName={receiver.userName}
        />
      </div>

      {/* Bottom Icons */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-4  cursor-pointer mr-4">
        <div onClick={handleMute} className="bg-[rgba(101,173,135)] p-3 rounded-full flex items-center justify-center">
          {isMuted ? (
            <FaMicrophoneSlash size={24} className="text-white" />
          ) : (
            <HiMicrophone size={24} className="text-white" />
          )}
        </div>
        <div onClick={handleVideo} className="bg-[#65ad87] p-3 rounded-full flex items-center justify-center  cursor-pointer">
          <FaVideoSlash size={24} className="text-white" />
        </div>
        <div onClick={handleEndCall} className="bg-[#DE3B46] p-3 rounded-full flex items-center justify-center  cursor-pointer">
          <MdCallEnd size={24} className="text-white" />
        </div>
      </div>

      {/* Call Duration */}
      {!isRinging && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-base px-4 py-2 rounded-full mt-16">
          {Math.floor(callDuration / 60)}:{('0' + (callDuration % 60)).slice(-2)}
        </div>
      )}

      {/* Button to Simulate Answering the Call */}
      
    </div>
  );
};

export default Call;