import { useState } from "react";
import RulesPanel from "../components/startmenu/RulesPanel";
import SettingsPanel from "../components/startmenu/SettingsPanel";
import LeaderboardPanel from "../components/startmenu/LeaderboardPanel";
import StartPanel from "../components/startmenu/StartPanel";

type PanelType = "default" | "rules" | "settings" | "leaderboard" | "start";

export default function StartMenu() {
  const [activePanel, setActivePanel] = useState<PanelType>("default");

  const renderPanel = () => {
    switch (activePanel) {
      case "rules":
        return <RulesPanel />;
      case "settings":
        return <SettingsPanel />;
      case "leaderboard":
        return <LeaderboardPanel />;
      case "start":
        return <StartPanel />;
      default:
        return <LeaderboardPanel />;
    }
  };

  return (
    <div className="pt-12  h-full w-full flex gap-8 justify-between">
      <div className="w-full flex flex-col items-center  ">
        <h1 className="title">PolitikschMERZen</h1>
        <div className="w-full flex flex-col mt-20 items-center  gap-6 ">
          <button
            className="primaryBtn bg-amber-200 hover:text-white text-black"
            onClick={() => setActivePanel("start")}
          >
            Spiel Starten
          </button>
          <button
            className="primaryBtn"
            onClick={() => setActivePanel("leaderboard")}
          >
            Leaderboards
          </button>
          <button
            className="primaryBtn"
            onClick={() => setActivePanel("settings")}
          >
            Einstellungen
          </button>
          <button
            className="primaryBtn"
            onClick={() => setActivePanel("rules")}
          >
            Spielregeln
          </button>
        </div>
      </div>
      <div className="bg-linear-to-r from-amber-200/70 to-amber-200/75 w-full rounded-4xl">
        <div className="p-14  w-full h-full flex flex-col  items-center text-black ">
          <div className="max-w-4xl  text-black w-full h-full overflow-y-auto flex flex-col  items-center">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}
