"use client";

import React, { useEffect, useState } from "react";
import {
  handleFriendRequest,
  getPendingFriendRequests,
} from "./FriendApiCalls";
import { useProfile } from "../../stores/UserStore";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Define the User type
interface User {
  id: string;
  requesterId: string;
  requesterDetails: {
    name: string;
    profilePic: string;
  };
  status: string;
  createdAt: string;
}

const PendingRequests: React.FC = () => {
  const [pFriendsData, pSetFriendsData] = useState<User[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const profile = useProfile();

  const acceptFriend = async (userId: string, status: string) => {
    try {
      const response = await handleFriendRequest(userId, status);
      console.log("Friend request accepted:", response);
      if (status === "accepted") {
        setAlertMessage("Friend request accepted");
        setAlertType("success");
      } else {
        setAlertMessage("Friend request rejected");
        setAlertType("success");
      }
    } catch (error) {
      console.error("Error handling friend request:", error);
      setAlertMessage("Error handling friend request");
      setAlertType("error");
    }
    fetchPendingFriendRequests();
  };

  const fetchPendingFriendRequests = async () => {
    if (!profile.userId) {
      console.error("User ID is undefined");
      return;
    }

    try {
      console.log(
        "Fetching pending friend requests for user:",
        profile.userId
      );
      const data = await getPendingFriendRequests(profile.userId);
      console.log("Fetched pending friend requests data:", data);
      pSetFriendsData(data.pendingRequests);
    } catch (error) {
      console.error("Error fetching pending friend requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingFriendRequests();
  }, [profile.userId]);

  const closeAlert = () => {
    setAlertMessage(null);
    setAlertType(null);
  };

  return (
    <div>
      {/* Display the alert message at the top with a close button */}
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
      <div>
        {loading ? (
          <div className="p-3">
            <Skeleton
              height={440}
              width={320}
              enableAnimation={true}
              baseColor="rgba(101, 173, 135, 0.2)"
              highlightColor="rgba(101, 173, 135, 0.4)"
              direction="ltr"
            />
          </div>
        ) : pFriendsData.length > 0 ? (
          pFriendsData.map((user) => (
            <div
              key={user.id}
              className="flex items-center px-4 py-2"
              style={{
                borderTopColor: "#65AD87",
                borderTopWidth: "2px",
                borderTopStyle: "solid",
              }}
            >
              <img
                src={
                  user.requesterDetails.profilePic ||
                  "/assets/extras/profilepicture.png"
                }
                alt={user.requesterDetails.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <span className="text-lg text-mtextra">
                {user.requesterDetails.name}
              </span>
              <div className="flex justify-end w-full">
                <button
                  className="w-16 p-3 m-1 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white flex items-center justify-center"
                  onClick={() => acceptFriend(user.id, "accepted")}
                >
                  <TiTick size={25} />
                </button>

                {/* Reject Button */}
                <button
                  className="w-16 p-3 m-1 rounded-3xl bg-[#65AD87] hover:bg-[#65AD87] text-white flex items-center justify-center"
                  onClick={() => acceptFriend(user.id, "rejected")}
                >
                  <RxCross2 size={22} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6">No pending friend requests</div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;