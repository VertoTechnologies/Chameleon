"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import snowflakeIcon from "../../../../public/assets/extras/snowflake.png";
import icebreakerIcon from "../../../../public/assets/extras/iceb.png";
import Timer from "./timer"; // Adjust the path as needed

interface IcebreakerProps {
  userId: string;
  friendId: string | null;
}

const Icebreaker: React.FC<IcebreakerProps> = ({ userId, friendId }) => {
  const [visible, setVisible] = useState(true);
  const [icebreaker, setIcebreaker] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!userId || !friendId) return;

    const fetchIcebreaker = async () => {
      try {
        const response = await axios.get(`/api/icebreaker/geticebreaker?userId=${userId}&friendId=${friendId}`); // for making http request
        setIcebreaker(response.data.question);
      } catch (error) {
        console.error("Error fetching icebreaker:", error);
      }
    };

    fetchIcebreaker();

    const key = `icebreakerVisible_${userId}_${friendId}`;
    const closeTimeKey = `icebreakerCloseTime_${userId}_${friendId}`;
    const storedVisibility = localStorage.getItem(key);
    const closeTime = parseInt(localStorage.getItem(closeTimeKey) || "0", 10);

    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (storedVisibility === 'false') {
      if (now - closeTime < twentyFourHours) {
        setTimerDuration(Math.max(0, twentyFourHours - (now - closeTime)));
        setVisible(false);
        return;
      }
    }

    setVisible(true);
  }, [userId, friendId]);

  const handleClose = () => {
    const now = Date.now();
    const key = `icebreakerVisible_${userId}_${friendId}`;
    const closeTimeKey = `icebreakerCloseTime_${userId}_${friendId}`;
    setVisible(false);
    localStorage.setItem(key, 'false');
    localStorage.setItem(closeTimeKey, now.toString());
  };

  return (
    <div>
      {timerDuration !== null && !visible && (
        <Timer duration={timerDuration} />
      )}
      {visible && icebreaker && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 py-2 mt-3 z-50">
          <div className="relative bg-blue-100 border border-blue-300 rounded-2xl shadow-md w-full">
            <div className="absolute top-0 left-0 m-0 flex">
              <Image src={snowflakeIcon} alt="Snowflake" width={20} height={20} />
              <Image src={snowflakeIcon} alt="Snowflake" width={20} height={20} className="ml-1" />
            </div>
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center">
                <Image src={icebreakerIcon} alt="Icebreaker" width={40} height={40} />
                <span className="ml-5">{icebreaker}</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 m-0 flex">
              <Image src={snowflakeIcon} alt="Snowflake" width={20} height={20} />
              <Image src={snowflakeIcon} alt="Snowflake" width={20} height={20} className="ml-1" />
            </div>
            <button onClick={handleClose} className="absolute top-2 right-2 text-black font-bold">x</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Icebreaker;
