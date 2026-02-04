import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Footer.css'
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    
      <footer className="footer">
        <ul className="nav justify-content-center footer-nav">
          <li className="nav-item">
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tv" className="nav-link">
              TV Shows
            </Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="people">
                People
              </Link>
            </li>
        </ul>

        <p className="footer-copy">© 2026 Cinema. All rights reserved.</p>
      </footer>
    
  );
}
