/**
 * Main Navbar component
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import React from "react";

const Navbar: React.FC = ({ children }) => {
  return (
    <nav className="navbar navbar--light">
      <div className="container">
        <a className="navbar__brand">ReactQL</a>
        <ul className="navbar__nav">
          <li className="nav__item">
            <a className="nav__link">About</a>
          </li>
          <li className="nav__item">
            <a className="nav__link">About</a>
          </li>
          <li className="nav__item">
            <a className="nav__link">About</a>
          </li>
        </ul>
        <div className="navbar__collapse">
          <ul className="navbar__nav navbar__nav--ml-auto">
            <li className="nav__item">
              <a className="nav__link">Login</a>
            </li>
            <li className="nav__item">
              <a className="nav__link">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
