import { useState } from "react";
import StartExperiment from "./Components/startExperiment";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <StartExperiment />;
}

export default App;
