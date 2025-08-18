import React, { useState } from "react";
import { useButtonSoundEffect } from "../../hooks/useButtonSoundEffect";

interface ActivatePowerupProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean; // external control for active state (optional)
}

export default function ActivatePowerup({
  children,
  isActive,
  className = "",
  ...props
}: ActivatePowerupProps) {
  const playClickSound = useButtonSoundEffect(
    "/audio/sounds/UI/power_up.mp3",
    0.7,
  );
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
      className={`${className} ${active ? "ring-2 ring-white" : ""}`}
    >
      {children}
    </button>
  );
}
