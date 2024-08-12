"use client";
import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number; // duration in milliseconds
  onComplete?: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1000));
      }, 1000);
    } else {
      if (onComplete) onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeRemaining, onComplete]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="text-red-500 font-bold">
      Reappears in: {formatTime(timeRemaining)}
    </div>
  );
};

export default Timer;
