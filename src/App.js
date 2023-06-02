import React from "react";
import "./styles/sass/Main.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";
// Pages
import TrainingPlan from "./pages/TrainingPlan/TrainingPlan";
import Imc from "./pages/Imc/Imc";
import Perfil from "./pages/Perfil/Perfil";
import Login from "./pages/forms/Login/Login";
import Register from "./pages/forms/Register/Register";
import ChangeUsername from "./pages/forms/ChangeUsername/ChangeUsername";
import ChangePassword from "./pages/forms/ChangePassword/ChangePassword";

const App = () => {
  const location = useLocation();

  const shouldShowNavbar = ![
    "/login",
    "/register",
    "/changeUsername",
    "/changePassword",
  ].includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}


      {/* Resto do seu código */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/trainingPlan" element={<TrainingPlan />} />
        <Route path="/imc" element={<Imc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changeUsername" element={<ChangeUsername />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
