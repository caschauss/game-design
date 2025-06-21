import { useState } from "react";
import RulesPanel from "../components/startmenu/RulesPanel";
import SettingsPanel from "../components/startmenu/SettingsPanel";
import LeaderboardPanel from "../components/startmenu/LeaderboardPanel";
import StartPanel from "../components/startmenu/StartPanel";
import SoundButton from "../components/audio/SoundButton";

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
    <div className="pt-12 h-full w-full flex gap-8 justify-between">
      <div className="w-full flex flex-col items-center">
        <h1 className="title">PolitikschMERZen</h1>
        <div className="w-full flex flex-col mt-20 items-center gap-6">
          <SoundButton
            className="primaryBtn"
            isActive={activePanel === "start"}
            onClick={() => setActivePanel("start")}
          >
            Spiel Starten
          </SoundButton>
          <SoundButton
            className="primaryBtn"
            isActive={activePanel === "leaderboard"}
            onClick={() => setActivePanel("leaderboard")}
          >
            Leaderboards
          </SoundButton>
          <SoundButton
            className="primaryBtn"
            isActive={activePanel === "settings"}
            onClick={() => setActivePanel("settings")}
          >
            Einstellungen
          </SoundButton>
          <SoundButton
            className="primaryBtn"
            isActive={activePanel === "rules"}
            onClick={() => setActivePanel("rules")}
          >
            Spielregeln
          </SoundButton>
        </div>
      </div>
      <div className="bg-linear-to-r from-amber-200/70 to-amber-200/75 w-full rounded-l-4xl">
        <div className="p-26 w-full h-full flex flex-col items-center text-black">
          <div className="max-w-4xl text-black w-full h-full overflow-y-auto flex flex-col items-center">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
}
