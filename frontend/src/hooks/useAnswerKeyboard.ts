import { useEffect } from "react";

type KeyMap = {
  [key: string]: number;
};

interface UseAnswerKeyboardParams {
  onSelect: (index: number) => void;
  isDisabled: boolean;
}

export function useAnswerKeyboard({
  onSelect,
  isDisabled,
}: UseAnswerKeyboardParams) {
  useEffect(() => {
    if (isDisabled) return;

    const keyMap: KeyMap = {
      ArrowLeft: 0, // Blau
      ArrowUp: 1, // Grün
      ArrowRight: 2, // Gelb
      ArrowDown: 3, // Rot
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyMap[e.key] !== undefined) {
        onSelect(keyMap[e.key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelect, isDisabled]);
}
