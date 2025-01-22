import React, { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

type TimerProps = {
  targetDate: string; // ISO 형식의 날짜 문자열
};

const Timer = ({ targetDate }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerId);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timerId = setInterval(updateTimer, 1000);

    // 초기화
    updateTimer();

    return () => clearInterval(timerId);
  }, [targetDate]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerItems}>
        <p className={styles.timerItemsTop}>{timeLeft.days}</p>
        <span className={styles.timerItemsBottom}>DAY</span>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.timerItems}>
        <p className={styles.timerItemsTop}>{timeLeft.hours}</p>
        <span className={styles.timerItemsBottom}>HR</span>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.timerItems}>
        <p className={styles.timerItemsTop}>{timeLeft.minutes}</p>
        <span className={styles.timerItemsBottom}>MIN</span>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.timerItems}>
        <p className={styles.timerItemsTop}>{timeLeft.seconds}</p>
        <span className={styles.timerItemsBottom}>SEC</span>
      </div>
    </div>
  );
};

export default Timer;
