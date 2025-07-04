import React, { useState } from "react";
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
  const playClickSound = useButtonSoundEffect("/audio/sounds/buttonClick.mp3");
  const [internalActive, setInternalActive] = useState(false);

  const active = isActive ?? internalActive;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    setInternalActive(true);
    if (props.onClick) props.onClick(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`${className} ${active ? "bg-amber-200 hover:text-white text-black" : ""}`}
    >
      {children}
    </button>
  );
}
