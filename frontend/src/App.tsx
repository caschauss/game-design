import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import BackgroundMusic from "./components/audio/BackgroundMusic";
import { SoundSettingsProvider } from "./components/audio/SoundSettings";

function App() {
  return (
    <>
      <SoundSettingsProvider>
        <Router>
          <BackgroundMusic />
          <div className="bg-zinc-900 h-screen w-screen text-white">
            {/* <NavBar /> */}

            <AppRoutes />
          </div>
        </Router>
      </SoundSettingsProvider>
    </>
  );
}

export default App;
