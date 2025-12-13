// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Materiel from "./views/Materiel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Accueil</h1>} />
        <Route path="/materiel" element={<Materiel />} />
      </Routes>
    </Router>
  );
}

export default App;
