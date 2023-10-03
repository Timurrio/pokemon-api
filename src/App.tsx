import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage/GamePage";
import PokedexPage from "./components/PokedexPage/PokedexPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokedexPage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
