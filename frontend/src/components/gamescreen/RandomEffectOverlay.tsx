interface RandomEffectOverlayProps {
  text: string;
  color: string;
  visible?: boolean;
}

// Tailwind color classes for the glowing border
const COLOR_CLASSES: Record<string, string> = {
  green: "border-green-500",
  red: "border-red-500",
  blue: "border-blue-500",
  yellow: "border-yellow-400",
  purple: "border-purple-500",
};

export default function RandomEffectOverlay({
  text,
  color,
  visible = true,
}: RandomEffectOverlayProps) {
  const borderClass = COLOR_CLASSES[color] || "border-gray-400";

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-50 pointer-events-auto transition-opacity duration-500 backdrop-blur-sm ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer glowing border */}
      <div
        className={`absolute inset-0 rounded-3xl border-10 ${borderClass} opacity-60 pointer-events-auto`}
      ></div>

      {/* Inner content */}
      <div className="relative w-2/5 h-1/3 flex items-center justify-center">
        <div
          className={` relative border-4 ${borderClass} flex flex-col gap-8 z-10 w-full h-full items-center justify-center p-12 rounded-3xl bg-zinc-800/75 text-white font-bold text-6xl  text-center`}
        >
          <h1 className="text-xl uppercase ">Random Event!</h1>
          <h1 className="animate-bounce ">{text}</h1>
        </div>
      </div>
    </div>
  );
}
