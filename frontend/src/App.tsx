// src/App.tsx
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";

function App() {
  const handleAPItest = async () => {
    try {
      const response = await fetch("http://localhost:3000/testapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "message": "test" }) // test message
      });

      const data = await response.json();
      console.log("Received answer: ", data);
    } catch (error) {
      console.error("Error testing: ", error);
    }
  };

  const handleGetColor = async () => {
    try {
      const response = await fetch("http://localhost:3000/getcolor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "message": "test" }) // test message
      });

      const data = await response.json();
      console.log("Received color: ", data);
    } catch (error) {
      console.error("Error testing: ", error);
    }
  };

  const handleSetColor = async (setcolor: string) => {
    try {
      const response = await fetch("http://localhost:3000/setcolor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "color": setcolor })
      });
      console.log("success");
    } catch (error) {
      console.error("Error testing: ", error);
    }
  };

  const handleGetRoundInformation = async () => {
    try {
      const response = await fetch("http://localhost:3000/getroundinformation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "message": "test" }) // test message
      });

      const data = await response.json();
      console.log("Received round information: ", data);
    } catch (error) {
      console.error("Error testing: ", error);
    }
  };

  const handleCallNewRound = async () => {
    try {
      await fetch("http://localhost:3000/newround", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "message": "new round" }) // placeholder message
      });

      console.log("Successfully requested new round");
    } catch (error) {
      console.error("Error requesting new round: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleAPItest}>Test API</button>

      <button onClick={handleGetColor}>Log color to console</button>
      <button onClick={() => handleSetColor("white")}>Set color to white</button>
      <button onClick={() => handleSetColor("black")}>Set color to black</button>

      <button onClick={handleGetRoundInformation}>Log round information to console</button>
      <button onClick={handleCallNewRound}>Request new Round</button>
    </div>
    <div className="bg-zinc-900 h-screen w-screen text-white">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
