'use client'

import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number; // Время в секундах
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("timerEnd");
      const endTime = savedTime ? parseInt(savedTime, 10) : Date.now() + duration * 1000;

      if (!savedTime) {
        localStorage.setItem("timerEnd", endTime.toString());
      }

      const remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      
      if (remainingTime === 0) {
        onExpire();
        return;
      }

      setTimeLeft(remainingTime);
    }
  }, [duration, onExpire]);

  useEffect(() => {
    if (timeLeft === null || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? Math.max(0, prev - 1) : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (timeLeft === null || timeLeft === 0) return null; // Прячем таймер, если он истёк

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return <span>{formattedTime}</span>;
};

export default Timer;
