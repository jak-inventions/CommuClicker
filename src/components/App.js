import "./App.css";
import Clicker from "./Clicker/Clicker";
import Title from "./Title/Title";
import Score from "./Score/Score";

const App = () => {
  return (
    <div id="app">
      <Title/>
      <Clicker/>
      <Score/>
    </div>
  );
};

export default App;
