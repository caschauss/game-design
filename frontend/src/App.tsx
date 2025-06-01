import './App.css';

function App() {
  const handleAPItest = async () => {
    try {
      const response = await fetch("http://localhost:3000/test", {
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

  return (
    <div>
      <button onClick={handleAPItest}>Test API</button>
    </div>
  );
}

export default App;