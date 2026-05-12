import { useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Dashboard
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );
}

export default App;