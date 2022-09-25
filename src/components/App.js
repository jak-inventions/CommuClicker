import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Clicker from "./Clicker/Clicker";
import Title from "./Title/Title";
import Score from "./Score/Score";

const App = () => {
  const [score, setScore] = useState(null);

  const onClick = async () => {
    setScore(score + 1);
  };

  useEffect(() => {
    console.log("ok");
  }, []);

  return (
    <div id="app">
      <Title/>
      <Clicker onClick={onClick}/>
      <Score score={score}/>
    </div>
  );
};

export default App;
