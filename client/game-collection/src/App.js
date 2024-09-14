import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Layout from "./components/layout/Layout";

import GameHub from "./pages/gameHub/GameHub";
import Hangman from "./games/hangman/Hangman";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<GameHub />} />
          <Route path="/hangman" element={<Hangman />} />
        </Routes>
      </Layout>
    </Router>
  );
}
