import React, { useState } from "react";
import { useButtonSoundEffect } from "../../hooks/useButtonSoundEffect";

interface PowerupButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean; // external control for active state (optional)
}

export default function PowerupButton({
  children,
  isActive,
  className = "",
  ...props
}: PowerupButtonProps) {
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
      className={`${className} ${active ? "ring-2 ring-white" : ""}`}
    >
      {children}
    </button>
  );
}
