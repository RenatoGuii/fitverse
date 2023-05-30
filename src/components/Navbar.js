import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {
    const mobileMenu = document.querySelector(".button-menu");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-item");

    const animateLinks = () => {
      navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    };

    const handleClick = () => {
      navList.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      animateLinks();
    };

    const initNavbar = () => {
      if (mobileMenu) {
        mobileMenu.addEventListener("click", handleClick);
      }
    };

    initNavbar();

    return () => {
      if (mobileMenu) {
        mobileMenu.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div>
      <header className="container-navbar">
        <nav>
          <Link to={"/trainingPlan"} className="navbar-logo">
            FitVerse
          </Link>
          <div className="button-menu">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={"/trainingPlan"} className="nav-link active">
                Exercícios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/imc"} className="nav-link active">
                IMC
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/perfil"} className="nav-link active">
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
