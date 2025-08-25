import React, { useState, useRef } from "react";
import { useButtonSoundEffect } from "../../hooks/useButtonSoundEffect";

interface SoundButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean; // external control for active state (optional)
}

export default function SoundButton({
  children,
  isActive,
  className = "",
  ...props
}: SoundButtonProps) {
  const playSelectSound = useButtonSoundEffect(
    "/audio/sounds/UI/button_select.mp3",
  );
  const playHoverSound = useButtonSoundEffect(
    "/audio/sounds/UI/button_hover.mp3",
  );

  const [internalActive, setInternalActive] = useState(false);
  const active = isActive ?? internalActive;

  // --- tiny throttle just for hover ---
  const lastHoverRef = useRef(0);
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    if (now - lastHoverRef.current > 150) {
      // only play every 150ms
      playHoverSound();
      lastHoverRef.current = now;
    }
    props.onMouseEnter?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSelectSound();
    setInternalActive(true);
    props.onClick?.(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`${className} ${
        active ? "bg-amber-200 hover:text-white text-black" : ""
      }`}
    >
      {children}
    </button>
  );
}
