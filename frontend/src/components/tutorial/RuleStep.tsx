type Corner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

type RuleStepProps = {
  image: string;
  text: string;
  corner?: Corner;
  isAnimating?: boolean;
};

const RuleStep: React.FC<RuleStepProps> = ({
  image,
  text,
  corner,
  isAnimating,
}) => {
  // Basisposition: Mitte
  let positionClasses = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  const offset = "-m-2"; // Tailwind margin 1.5rem, adjust as needed

  // Zielposition nach Ecke, falls animiert
  if (isAnimating && corner) {
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
      className={`absolute w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500 transition-all duration-700 ease-in-out ${positionClasses}`}
    >
      <img src={image} alt={text} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-yellow-400/75 backdrop-blur-md flex items-center justify-center p-8">
        <p className="text-black font-semibold  text-lg sm:text-xl">{text}</p>
      </div>
    </div>
  );
};

export default RuleStep;
