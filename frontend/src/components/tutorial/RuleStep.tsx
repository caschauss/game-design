import { useState, useEffect } from "react";

type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type RuleStepProps = {
  image: string;
  title: string;
  shortDescription: string;
  points: string[];
  corner?: Corner;
  isAnimating?: boolean;
};

const RuleStep: React.FC<RuleStepProps> = ({
  image,
  title,
  shortDescription,
  points,
  corner,
  isAnimating,
}) => {
  // Basisposition: Mitte
  let positionClasses = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  let scaleClasses = "scale-150"; // Standardmäßig etwas größer
  const offset = "-m-2"; // Tailwind margin 1.5rem, adjust as needed
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // nach dem Mount sichtbar machen
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Zielposition nach Ecke, falls animiert
  if (isAnimating && corner) {
    scaleClasses = "scale-100"; // Normale Größe bei Animation
    switch (corner) {
      case "topLeft":
        positionClasses = `top-0 left-0 translate-x-0 translate-y-0 ${offset}`;
        break;
      case "topRight":
        positionClasses = `top-0 right-0 translate-x-0 translate-y-0 ${offset}`;
        break;
      case "bottomLeft":
        positionClasses = `bottom-0 left-0 translate-x-0 translate-y-0 ${offset}`;
        break;
      case "bottomRight":
        positionClasses = `bottom-0 right-0 translate-x-0 translate-y-0 ${offset}`;
        break;
    }
  }

  return (
    <div
      className={`opacity-0 transition-opacity duration-300 ${visible ? "opacity-100" : ""}`}
    >
      <div
        className={`absolute w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200 transition-all duration-1000 ease-in-out ${positionClasses} ${scaleClasses}`}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-amber-200/70 backdrop-blur-md flex items-center justify-center p-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-end">
              <h1 className="text-black text-xl sm:text-xl">
                <strong className="font-extrabold uppercase"> {title} </strong>{" "}
                - {shortDescription}
              </h1>
            </div>
            <ul className="list-disc pl-5 grid grid-cols-2 gap-x-6">
              {points.map((point, idx) => (
                <li key={idx} className="text-black text-lg sm:text-base">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleStep;
