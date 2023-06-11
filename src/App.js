import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./styles/sass/Main.css";

// Context
import UserContext from "./Contexts/AuthContext";

// Components
import Navbar from "./components/Navbar";

// Pages
import Register from "./pages/forms/Register/Register";
import Login from "./pages/forms/Login/Login";
import TrainingPlan from "./pages/TrainingPlan/TrainingPlan";
import Imc from "./pages/Imc/Imc";
import Perfil from "./pages/Perfil/Perfil";
import ChangeUsername from "./pages/forms/ChangeUsername/ChangeUsername";
import ChangePassword from "./pages/forms/ChangePassword/ChangePassword";

const App = () => {
  const { isAuthenticated, user } = useContext(UserContext);
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
      <Routes>
        {/* não precisa de autenticação */}
        <Route path="/" element={<Navigate to="/trainingPlan" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Precisa de autenticação */}
        {isAuthenticated() ? (
          <>
            <Route path="/trainingPlan" element={<TrainingPlan />} />
            <Route path="/imc" element={<Imc />} />
            <Route path="/changeUsername" element={<ChangeUsername />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/perfil" element={<Perfil />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
