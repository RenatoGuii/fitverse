import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  // Menu Mobile
  class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
    }

    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }

    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }

    addClickEvent() {
      this.handleClick();
    }

    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }

  const mobileNavbar = new MobileNavbar(
    ".button-menu",
    ".nav-list",
    ".nav-item"
  );

  const initNavbar = () => {
    mobileNavbar.init();
  };

  return (
    <div>
      <header className="container-navbar">
        <nav>
          <a href="/" className="navbar-logo">
            FitVerse
          </a>
          <div className="button-menu" onClick={initNavbar}>
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
