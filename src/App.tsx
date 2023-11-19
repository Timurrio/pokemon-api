import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage/GamePage";
import PokedexPage from "./components/PokedexPage/PokedexPage";
import Navbar from "./components/Navbar/Navbar";
import { PokemonPage } from "./components/PokemonPage/PokemonPage";
import ScrollToTopWrapper from "./components/ScrollToTopWrapper";
import { ScrollTopButton } from "./components/ScrollTopButton/ScrollTopButton";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTopWrapper>
          <Navbar />
          <ScrollTopButton />
          <Routes>
            <Route path="/" element={<PokedexPage />} />
            <Route path="/:id" element={<PokemonPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </ScrollToTopWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
