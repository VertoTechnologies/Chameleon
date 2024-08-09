"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../../stores/UserStore";
import { getFriendsList } from "./FriendApiCalls";
import FriendActionsDropdown from "./friendsdropdown"; // Ensure the path is correct
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

interface LeftBoxProps {
  activeButton: string;
  toggleButton: (button: string) => void;
}

interface User {
  _id: string;
  userId: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  userInterests: string[];
  fluentLanguages?: string[];
  learningLanguages?: string[];
  nativeLanguage: string;
  profilePic: string;
  userDescription: string;
  isOnline: boolean;
  __v: number;
  fluentLanguagess?: string[];
  learningLanguagess?: string[];
}

interface Chat {
  _id: string;
  language: string;
  groupPhoto: string;
  users: string[];
}

const LeftBox: React.FC<LeftBoxProps> = ({ activeButton, toggleButton }) => {
  const router = useRouter();
  const [friendsList, setFriendsList] = useState<User[]>([]);
  const [communitiesList, setCommunitiesList] = useState<Chat[]>([]);
  const profile = useProfile();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function removeFriend(requesterId: string, recipientId: string) {
    try {
      const response = await fetch("/api/friends/removeFriend", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requesterId, recipientId }),
      });

      setFriendsList(
        friendsList.filter((friend) => friend.userId !== recipientId)
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      console.error("Error removing friend:", error);
      throw error;
    }
  }

  const closeAlert = () => {
    setAlertMessage(null);
    setAlertType(null);
  };

  useEffect(() => {
    const fetchFriendList = async () => {
      if (!profile.userId) {
        console.error("User ID is undefined");
        return;
      }

      try {
        const data = await getFriendsList(profile.userId);
        setFriendsList(data.friends);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriendList();
  }, [profile.userId]);

  useEffect(() => {
    const fetchCommunitiesList = async () => {
      const userId = profile.userId;
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      try {
        const response = await axios.get<Chat[]>(
          `/api/userprofile/getGroups?userId=${userId}`
        );
        setCommunitiesList(response.data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunitiesList();
  }, [profile.userId]);

  const getChatRoom = async (userId1: string, userId2: string) => {
    // Call the getChatRoom API
    const response = await fetch(
      `/api/chats/getchatroom?userId1=${userId1}&userId2=${userId2}`
    );
    const data = await response.json();
    return data;
  };

  const handleFriendClick = async (userId: string) => {
    const chatroom: string = await getChatRoom(profile.userId, userId);

    router.push(
      `/Chat?chatroom=${encodeURIComponent(
        chatroom
      )}&friendId=${encodeURIComponent(userId)}`
    );
  };

  const handleBlockFriend = (userId: string) => {
    console.log(`Block friend with ID: ${userId}`);
  };

  const handleRemoveFriend = async (userId: string) => {
    try {
      const response = await removeFriend(profile.userId, userId);
      setAlertMessage("Friend removed");
      setAlertType("success");
    } catch (error) {
      console.error("Error removing friend:", error);
      setAlertMessage("Error removing friend");
      setAlertType("error");
    }
  };

  const handleCommunityClick = (communityId: string) => {
    router.push(`/CommunityChat?chatId=${encodeURIComponent(communityId)}`);
  };

  const handleLeaveCommunity = (communityId: string) => {
    console.log(`Leave community with ID: ${communityId}`);
  };

  // Separate online and offline friends
  const onlineFriends = friendsList.filter((friend) => friend.isOnline);
  const offlineFriends = friendsList.filter((friend) => !friend.isOnline);

  return (
    <div
      className="w-1/4 h-[600px] overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: "rgba(101, 173, 135, 0.2)" }}
    >
      {alertMessage && (
        <div
          className={`fixed top-0 left-0 right-0 p-4 text-center z-50 ${
            alertType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
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

      <div className="p-4 flex mt-4 ml-7">
        <button
          className={`px-10 py-2 rounded-full border-none ${
            activeButton === "friends"
              ? "bg-custom-green text-white shadow-2xl"
              : "bg-white text-black shadow"
          }`}
          style={{
            backgroundColor: activeButton === "friends" ? "#65AD87" : "white",
            borderRadius: "30px",
            marginRight: "-15px",
            boxShadow:
              activeButton === "friends"
                ? "5px 4px 10px rgba(5, 5, 0, 0.5)"
                : "none",
          }}
          onClick={() => toggleButton("friends")}
        >
          Friends
        </button>
        <button
          className={`px-9 py-2 rounded-full border-none ${
            activeButton === "community"
              ? "bg-custom-green text-white shadow-2xl"
              : "bg-white text-black shadow"
          }`}
          style={{
            backgroundColor: activeButton === "community" ? "#65AD87" : "white",
            borderRadius: "30px",
            zIndex: 1,
            position: "relative",
            left: "-15px",
            boxShadow:
              activeButton === "community"
                ? "5px 4px 10px rgba(5, 5, 0, 0.5)"
                : "none",
          }}
          onClick={() => toggleButton("community")}
        >
          Requests
        </button>
      </div>

      {/* Online Friends Section */}
      <div className="mt-4 ml-6 mr-3">
        {onlineFriends.length > 0 ? (
          <>
            {onlineFriends.map((user) => (
              <div
                key={user.userId}
                className="flex items-center p-4 border-b-2 cursor-pointer"
                style={{ borderBottomColor: "#65AD87" }}
              >
                <img
                  src={user.profilePic || "/assets/extras/profilepicture.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-3 border-4 border-green-500"
                  onClick={() => handleFriendClick(user.userId)}
                />
                <span
                  className="text-lg font-medium flex-grow"
                  onClick={() => handleFriendClick(user.userId)}
                >
                  {user.name}
                </span>
                <FriendActionsDropdown
                  onBlock={() => handleBlockFriend(user.userId)}
                  onRemove={() => handleRemoveFriend(user.userId)}
                />
              </div>
            ))}
          </>
        ) : (
          loading && (
            <div className="p-3 border-2 border-transparent">
              <Skeleton
                height={160}
                width={320}
                enableAnimation={true}
                baseColor="rgba(101, 173, 135, 0.2)"
                highlightColor="rgba(101, 173, 135, 0.4)"
                direction="ltr"
              />
            </div>
          )
        )}

        {/* Offline Friends Section */}
        {offlineFriends.length > 0 ? (
          <>
            {offlineFriends.map((user) => (
              <div
                key={user.userId}
                className="flex items-center p-4 border-b-2 cursor-pointer"
                style={{ borderBottomColor: "#65AD87" }}
              >
                <img
                  src={user.profilePic || "/assets/extras/profilepicture.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-3 border-4 border-gray-500"
                  onClick={() => handleFriendClick(user.userId)}
                />
                <span
                  className="text-lg font-medium flex-grow"
                  onClick={() => handleFriendClick(user.userId)}
                >
                  {user.name}
                </span>
                <FriendActionsDropdown
                  onBlock={() => handleBlockFriend(user.userId)}
                  onRemove={() => handleRemoveFriend(user.userId)}
                />
              </div>
            ))}
          </>
        ) : (
          loading && (
          <></>
          )
        )}
      </div>

      {/* Community Section */}
      <div className="mt-4 ml-6 mr-3">
        <h2 className="text-2xl font-semibold">Communities</h2>
        {communitiesList.length > 0
          ? communitiesList.map((community) => (
              <div
                key={community._id}
                className="flex items-center p-4 border-b-2 cursor-pointer"
                style={{ borderBottomColor: "#65AD87" }}
                onClick={() => handleCommunityClick(community._id)}
              >
                <img
                  src={
                    community.groupPhoto ||
                    `/assets/extras/${community.language}.png`
                  }
                  alt={community.language}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <span className="text-lg font-medium flex-grow">
                  {community.language}
                </span>
              </div>
            ))
          : loading && (
              <>
                  <div className="p-3 border-2 border-transparent">
              <Skeleton
                height={160}
                width={320}
                enableAnimation={true}
                baseColor="rgba(101, 173, 135, 0.2)"
                highlightColor="rgba(101, 173, 135, 0.4)"
                direction="ltr"
              />
            </div>
              </>
            )}
      </div>
    </div>
  );
};

export default LeftBox;
