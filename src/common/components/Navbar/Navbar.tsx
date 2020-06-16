/**
 * Main Navbar component
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar--light text--bold">
      <div className="container">
        <a
          href="/"
          className="navbar__brand text--upper text--spacing-4 text--black"
        >
          ReactQL
        </a>
        <ul className="navbar__nav">
          <li className="nav__item">
            <a href="/about" className="nav__link">
              About
            </a>
          </li>
          <li className="nav__item"></li>
          <li className="nav__item">
            <a href="/trend" className="nav__link">
              Trend
            </a>
          </li>
        </ul>
        <div className="navbar__collapse">
          <ul className="navbar__nav navbar__nav--ml-auto">
            <li className="nav__item">
              <a href="/login" className="nav__link">
                Login
              </a>
            </li>
            <li className="nav__item">
              <a href="/register" className="nav__link">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
