import React from "react";
import "./styles/sass/Main.css"
import { Routes, Route, Navigate } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
// Pages
import About from "./pages/About/About";
import TrainingPlan from "./pages/TrainingPlan/TrainingPlan";
import Imc from "./pages/Imc/Imc";
import Perfil from "./pages/Perfil/Perfil"

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<About />} />
        <Route path="/trainingPlan" element={<TrainingPlan />} />
        <Route path="/imc" element={<Imc />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>

    </div>
  );
};

export default App;
