"use client";

import { useEffect, useState } from "react";

export default function HeartbeatRipple() {
  const [ripples, setRipples] = useState<number[]>([]);

  useEffect(() => {
    // Fire the first ripple after a short initial delay
    const initialTimeout = setTimeout(() => {
      setRipples((prev) => [...prev, Date.now()]);
    }, 4000);

    // Then fire every 15 seconds
    const interval = setInterval(() => {
      setRipples((prev) => [...prev, Date.now()]);
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Clean up old ripples after animation completes (3.5s)
  useEffect(() => {
    if (ripples.length === 0) return;
    const cleanup = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 3500);
    return () => clearTimeout(cleanup);
  }, [ripples]);

  return (
    <div
      aria-hidden="true"
      className="heartbeat-ripple-container"
    >
      {ripples.map((id) => (
        <div key={id} className="heartbeat-ripple" />
      ))}
    </div>
  );
}
