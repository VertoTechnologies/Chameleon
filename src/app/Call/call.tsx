import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
// import Frame from "../components/frame";
import { useSearchParams } from "next/navigation";

import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { useProfile } from "../components/slaystore";
import { useRouter } from "next/navigation";

import {
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  useJoin,
  usePublish,
  useRemoteUsers,
  useRemoteAudioTracks,
  ICameraVideoTrack,
} from "agora-rtc-react";

const Frame = dynamic(() => import("../components/frame"), { ssr: false });

const Call = () => {
  // const [isClient, setIsClient] = useState(false);
  const [receiver, setReceiver] = useState({
    profilePicture: "/assets/extras/profilepicture.png",
    userName: "Receiver Name",
  });

  const placeHolderImage =
    "<img src='https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png' alt='Profile Picture' style='width: 100%; height: 100%; object-fit: cover;' />";
  const searchParams = useSearchParams();

  const friendId = searchParams?.get("friend") ?? null;
  const [friendName, setFriendName] = useState<string | null>(null);
  const [isRinging, setIsRinging] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [muteStatus, setMuteStatus] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const caller = useProfile();
  const currentUserId = useProfile().userId;

  const { localMicrophoneTrack, isLoading: isLoadingMic } =
    useLocalMicrophoneTrack();
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
    // if (isClient) {
      audioTracks.forEach((track) => track.play());
    // }
  }, [audioTracks]);

  useEffect(() => {
    if (
      !isLoadingCam &&
      localCameraTrack &&
      localVideoRef.current
    ) {
      localCameraTrack.play(localVideoRef.current);
      localCameraTrack.setEnabled(false);
      localVideoRef.current.innerHTML = placeHolderImage;
    }

    // if (isClient) {
      if (remoteUsers.length > 0) {
        const remoteUser = remoteUsers[0];
        console.log("Remote user:", remoteUser);
        console.log("Remote user video track:", remoteUser.videoTrack);

        if (remoteUser.videoTrack) {
          if (remoteVideoRef.current) {
            remoteUser.videoTrack.play(remoteVideoRef.current);
            console.log("Playing remote user video track.");
          } else {
            console.error("Remote video reference is not available.");
          }
        } else {
          console.error("Remote user does not have a video track.");
          if (remoteVideoRef.current) {
            remoteVideoRef.current.innerHTML = placeHolderImage;
          }
        }
      } else {
        console.warn("No remote users available.");
      }
    

    if (remoteUsers.length > 0) {
      handleCallAnswered();
    }
  }, [
    audioTracks,
    isLoadingCam,
    localCameraTrack,
    remoteUsers,
    localMicrophoneTrack,
    // isClient,
  ]);

  useEffect(() => {
    
      const fetchUser = async (id: string) => {
        try {
          const response = await fetch(`/api/viewProfile?userId=${id}`);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          setFriendName(data.name);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setFriendName("Friend");
        }
      };

      fetchUser(friendId||"");
    
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

  const handleMuteCall = async () => {
    try {
      console.log("handleMuteCall triggered");
      if (localMicrophoneTrack) {
        const newMuteStatus = localMicrophoneTrack.enabled;
        console.log("Setting microphone enabled state to:", newMuteStatus);
        await localMicrophoneTrack.setEnabled(!newMuteStatus);
        setMuteStatus(newMuteStatus);
        console.log("Microphone state set to:", newMuteStatus);
      } else {
        console.warn("Microphone track is not available or is locked");
      }
    } catch (error) {
      console.error("Error in handleMuteCall:", error);
    }
  };

  const handleVideo = () => {
    if (localCameraTrack) {
      const newEnabledState = toggleCameraTrackEnabled(localCameraTrack);

      updateLocalVideoDisplay(newEnabledState, localVideoRef, placeHolderImage);
    }
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
          Waiting for {friendName} to join...
        </div>
      )}
      <div className="relative flex flex-row h-full justify-center items-center space-x-8">
        <Frame
          videoRef={localVideoRef}
          userName={caller.name || "Caller Name"}
        />
        <Frame videoRef={remoteVideoRef} userName={friendName || "Friend"} />
      </div>
      <div className="absolute bottom-2 transform -translate-x-1/2 flex flex-row space-x-4 cursor-pointers mb-3">
        <div
          onClick={handleMuteCall}
          className="bg-[#65ad87] p-3 rounded-full flex items-center justify-center cursor-pointer"
        >
          {muteStatus ? (
            <FaMicrophoneSlash size={24} className="text-white" />
          ) : (
            <FaMicrophone size={24} className="text-white" />
          )}
        </div>
        <div
          onClick={handleVideo}
          className="bg-[#65ad87] p-3 rounded-full flex items-center justify-center cursor-pointer"
        >
          {localCameraTrack?.enabled ? (
            <FaVideo size={24} className="text-white" />
          ) : (
            <FaVideoSlash size={24} className="text-white" />
          )}
        </div>
        <div
          onClick={handleEndCall}
          className="bg-[#DE3B46] p-3 rounded-full flex items-center justify-center cursor-pointer"
        >
          <MdCallEnd size={24} className="text-white" />
        </div>
      </div>
      {!isRinging && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-base px-4 py-2 rounded-full mt-16">
          {Math.floor(callDuration / 60)}:
          {("0" + (callDuration % 60)).slice(-2)}
        </div>
      )}
    </div>
  );
};

function toggleCameraTrackEnabled(localCameraTrack: ICameraVideoTrack) {
  const newEnabledState = !localCameraTrack.enabled;
  localCameraTrack.setEnabled(newEnabledState);
  return newEnabledState;
}

function updateLocalVideoDisplay(
  newEnabledState: boolean,
  localVideoRef: React.RefObject<HTMLDivElement>,
  placeHolderImage: string
) {
  if (!newEnabledState) {
    if (localVideoRef.current)
      localVideoRef.current.innerHTML = placeHolderImage;
  } else {
    if (localVideoRef.current) localVideoRef.current.innerHTML = "";
  }
  // }
}

export default Call;
