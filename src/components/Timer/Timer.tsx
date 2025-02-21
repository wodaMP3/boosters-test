'use client'

import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number;
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("timerEnd");
      const endTime = savedTime ? parseInt(savedTime, 10) : Date.now() + duration * 1000;

      localStorage.setItem("timerEnd", endTime.toString());

      setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
    }
  }, [duration]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft === 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? Math.max(0, prev - 1) : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  if (timeLeft === null) return null; // Пока идёт инициализация

  return <span>{timeLeft}</span>;
};

export default Timer;
