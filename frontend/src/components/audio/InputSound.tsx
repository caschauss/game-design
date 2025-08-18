import React from "react";
import { useButtonSoundEffect } from "../../hooks/useButtonSoundEffect";

interface InputSoundProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sound?: string;
}

export function InputSound({
  sound = "/audio/sounds/UI/button_select.mp3",
  onChange,
  ...props
}: InputSoundProps) {
  const playSound = useButtonSoundEffect(sound);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playSound();
    if (onChange) onChange(e);
  };

  return <input {...props} onChange={handleChange} />;
}
