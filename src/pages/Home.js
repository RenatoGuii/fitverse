import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import TrainingPlan from "../components/TrainingPlan";
import Imc from "../components/Imc";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        className="scrollspy-example"
        tabIndex="0"
      >
        <About />
        <TrainingPlan />
        <Imc />
      </div>
    </div>
  );
};

export default Home;
