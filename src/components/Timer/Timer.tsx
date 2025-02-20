import React, { useEffect, useState } from "react";

interface TimerProps {
  duration: number; // Время в секундах (например, 1500 = 25 минут)
  onExpire: () => void; // Коллбэк при окончании таймера
}

const Timer: React.FC<TimerProps> = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timerEnd");
    const endTime = savedTime ? parseInt(savedTime, 10) : Date.now() + duration * 1000;
    return Math.max(0, Math.floor((endTime - Date.now()) / 1000));
  });

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  useEffect(() => {
    localStorage.setItem("timerEnd", String(Date.now() + timeLeft * 1000));
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return <span>{formatTime(timeLeft)}</span>;
};

export default Timer;
