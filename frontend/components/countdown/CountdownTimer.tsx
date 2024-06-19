import { Generated_Code } from "@/constants/auth";
import React, { useEffect, useState } from "react";

type countDownProps = {
    timeLeft: number;
    setTimeLeft:(timeLeft: any) => void;
}
export default function CountdownTimer({timeLeft, setTimeLeft}: countDownProps) {
//   const [timeLeft, setTimeLeft] = useState(120); // 120 seconds for 2 minutes
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [setTimeLeft, timeLeft]);

  // Format the time left in mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    console.log("timeee: ", timeLeft);
  }, [timeLeft]);

  return (
    <div>
      <h1>{Generated_Code.BEFORE_RESEND}</h1>
      <p className="flex justify-center">{formatTime(timeLeft)}</p>
    </div>
  );
}
