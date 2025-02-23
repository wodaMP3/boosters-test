'use client'

import React, { useState, useEffect } from "react";

/**
 * Интерфейс для пропсов компонента Timer.
 */
interface TimerProps {
  /** Время в секундах, которое должно отсчитываться */
  duration: number;
  /** Функция, вызываемая при окончании таймера */
  onExpire: () => void;
}

/**
 * Компонент таймера, который отсчитывает время и сохраняет его в localStorage.
 * Если таймер уже истёк, он скрывается.
 * 
 * @param {TimerProps} props - Свойства компонента.
 * @returns {JSX.Element | null} Отформатированное время или `null`, если таймер истёк.
 */

const Timer: React.FC<TimerProps> = ({ duration, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Получаем сохранённое время окончания из localStorage
      const savedTime = localStorage.getItem("timerEnd");
      const endTime = savedTime ? parseInt(savedTime, 10) : Date.now() + duration * 1000;

      // Если в localStorage нет сохранённого времени, устанавливаем его
      if (!savedTime) {
        localStorage.setItem("timerEnd", endTime.toString());
      }

      // Вычисляем оставшееся время
      const remainingTime = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      
      // Если таймер уже истёк, вызываем onExpire и не обновляем state
      if (remainingTime === 0) {
        onExpire();
        return;
      }

      setTimeLeft(remainingTime);
    }
  }, [duration, onExpire]);

  useEffect(() => {
    if (timeLeft === null || timeLeft === 0) return;

    // Запускаем интервал, который каждую секунду уменьшает `timeLeft`
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? Math.max(0, prev - 1) : 0));
    }, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Если таймер истёк, не рендерим его
  if (timeLeft === null || timeLeft === 0) return null;

  // Форматируем оставшееся время в MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return <span>{formattedTime}</span>;
};

export default Timer;
