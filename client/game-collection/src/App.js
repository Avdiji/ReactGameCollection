import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { useEffect, useState } from "react";
// import { generalWebsocketHandler } from "./services/websockets/General.websocket";


import Layout from "./components/layout/Layout";

import LandingPage from "./pages/landingPage/LandingPage";
import GameHub from "./pages/gameHub/GameHub";

export default function App() {

  // const [userID, setUserID] = useState("");

  // useEffect(() => {
  //   generalWebsocketHandler((message => {
  //     console.log("Received message: " + message);
  //   }));
  // });

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gameHub" element={<GameHub />} />
        </Routes>
      </Layout>
    </Router>
  );
}
