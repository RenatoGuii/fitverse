import React, { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const mobileMenu = document.querySelector(".button-menu");
    const navList = document.querySelector(".nav-list");
    const navLinks = document.querySelectorAll(".nav-item");

    const animateLinks = () => {
      navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
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
          <a href="/" className="navbar-logo">
            FitVerse
          </a>
          <div className="button-menu">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#about" className="nav-link active">
                Sobre
              </a>
            </li>
            <li className="nav-item">
              <a href="#plan-training" className="nav-link active">
                Plano de Treinos
              </a>
            </li>
            <li className="nav-item">
              <a href="#imc" className="nav-link active">
                IMC
              </a>
            </li>
            <li className="nav-item">
              <a href="*" className="nav-link active">
                Perfil
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
