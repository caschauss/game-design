// src/App.tsx
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";

function App() {
    
  return (
    <>
      <div className="bg-zinc-900 h-screen w-screen text-white">
        <NavBar />
        <AppRoutes />
      </div>
    </>);
}

export default App;
