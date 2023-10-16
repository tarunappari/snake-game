import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import GameStart from "./Components/GameStart";
import { GlobalStyles } from "./GlobalStyles";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GameStart />} />
      </Routes>
    </div>
  );
}

export default App;
