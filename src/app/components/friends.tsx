import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "./slaystore";
import { getFriendsList } from "./FriendRequest";
import FriendActionsDropdown from "./friendsdropdown"; // Ensure the path is correct

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

const LeftBox: React.FC<LeftBoxProps> = ({ activeButton, toggleButton }) => {
  const router = useRouter();
  const [friendsList, setFriendsList] = useState<User[]>([]);
  const profile = useProfile();

  useEffect(() => {
    const fetchFriendList = async () => {
      if (!profile.userId) {
        console.error("User ID is undefined");
        return;
      }

      try {
        console.log("Fetching friends for user:", profile.userId);
        const data = await getFriendsList(profile.userId);
        console.log("Fetched friends data:", data);
        setFriendsList(data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriendList();
  }, [profile.userId]);

  const handleFriendClick = (userId: string) => {
    router.push(`/Chat?friend=${encodeURIComponent(userId)}`);
  };

  const handleBlockFriend = (userId: string) => {
    // Implement block friend logic here
    console.log(`Block friend with ID: ${userId}`);
  };

  const handleRemoveFriend = (userId: string) => {
    // Implement remove friend logic here
    console.log(`Remove friend with ID: ${userId}`);
  };

  return (
    <div
      className="w-1/4 h-screen overflow-y-auto custom-scrollbar"
      style={{ backgroundColor: "rgba(101, 173, 135, 0.2)" }}
    >
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

      {/* Friends List */}
      <div className="mt-4 ml-6 mr-3">
        {friendsList.length > 0 ? (
          friendsList.map((user) => (
            <div
              key={user.userId}
              className="flex items-center p-4 border-b-2 cursor-pointer"
              style={{ borderBottomColor: "#65AD87" }}
            >
              <img
                src={user.profilePic || "/assets/extras/profilepicture.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-3"
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
          ))
        ) : (
          <div className="p-3 border-2 border-white">You have no friends</div>
        )}
      </div>
    </div>
  );
};

export default LeftBox;
