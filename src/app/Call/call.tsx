"use client";
import React, { useEffect, useRef, useState } from "react";
import Frame from "./frame"; // Ensure the correct path based on your project structure
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { HiMicrophone } from "react-icons/hi";
import { MdCallEnd } from "react-icons/md";
import { useProfile } from "../components/slaystore"; // Ensure the correct path
import { useRouter } from "next/navigation";
import AgoraRTC, {
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  useJoin,
  usePublish,
  useRemoteUsers,
  useRemoteAudioTracks,
} from "agora-rtc-react";

interface CallProps {
  friendId: string | null;
}

const Call: React.FC<CallProps> = ({ friendId }) => {
  const [receiver, setReceiver] = useState({
    profilePicture: "/assets/extras/profilepicture.png",
    userName: "Receiver Name",
  });

  const [friendName, setFriendName] = useState<string | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isRinging, setIsRinging] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const caller = useProfile();
  const currentUserId = useProfile().userId;

  const { localMicrophoneTrack, isLoading: isLoadingMic } = useLocalMicrophoneTrack();
  const { localCameraTrack, isLoading: isLoadingCam } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    channel: "hello",
    token: process.env.NEXT_PUBLIC_AGORA_TOKEN!,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioTracks.forEach((track) => track.play());
    }
  }, [audioTracks]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoadingCam && localCameraTrack && localVideoRef.current) {
      localCameraTrack.play(localVideoRef.current);
    }

    if (typeof window !== "undefined") {
      remoteUsers.forEach((user) => {
        user.videoTrack?.play(remoteVideoRef.current!);
      });

      if (remoteUsers.length > 0) {
        handleCallAnswered();
      }
    }
  }, [isLoadingCam, localCameraTrack, remoteUsers]);

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const response = await fetch(`/api/viewProfile?userId=${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setFriendName(data.name);
        // setProfilePic(data.profilePic || '/assets/extras/profilepicture.png');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setFriendName('Friend');
        // setProfilePic('/assets/extras/profilepicture.png');
      }
    };

    if (friendId) {
      fetchUser(friendId);
    }
  }, [friendId]);

  useEffect(() => {
    if (!isRinging && !timer) {
      const newTimer = setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
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
    localMicrophoneTrack?.setEnabled(!isMuted);
  };

  const handleVideo = () => {
    localCameraTrack?.setEnabled(!localCameraTrack?.enabled);
  };

  const handleEndCall = () => {
    router.push(`/Chat?friend=${friendId}`);
  };

  const handleCallAnswered = () => {
    setIsRinging(false);
  };

  return (
    <div
      className="flex flex-col h-[750px] rounded-lg shadow-lg relative bg-cover bg-center items-center justify-center"
      style={{ backgroundImage: "url('/assets/extras/Background.png')" }}
    >
      <div className="absolute inset-0 bg-[rgba(101,173,135,0.3)]"></div>
      {isRinging && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-base px-4 py-2 rounded-full mt-16">
          Ringing...
        </div>
      )}
      <div className="relative flex flex-row h-full justify-center items-center space-x-8">
        <Frame videoRef={localVideoRef} userName={caller.name || "Caller Name"} />
        <Frame videoRef={remoteVideoRef} userName={friendName || "Friend"} />
      </div>
      <div className="absolute bottom-2 transform -translate-x-1/2 flex flex-row space-x-4 cursor-pointers mb-3">
        <div onClick={handleMute} className="bg-[rgba(101,173,135)] p-3 rounded-full flex items-center justify-center">
          {isMuted ? <FaMicrophoneSlash size={24} className="text-white" /> : <HiMicrophone size={24} className="text-white" />}
        </div>
        <div onClick={handleVideo} className="bg-[#65ad87] p-3 rounded-full flex items-center justify-center cursor-pointer">
          <FaVideoSlash size={24} className="text-white" />
        </div>
        <div onClick={handleEndCall} className="bg-[#DE3B46] p-3 rounded-full flex items-center justify-center cursor-pointer">
          <MdCallEnd size={24} className="text-white" />
        </div>
      </div>
      {!isRinging && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-base px-4 py-2 rounded-full mt-16">
          {Math.floor(callDuration / 60)}:{("0" + (callDuration % 60)).slice(-2)}
        </div>
      )}
    </div>
  );
};

export default Call;
