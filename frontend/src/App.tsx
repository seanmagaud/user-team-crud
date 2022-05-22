import * as React from "react";
import { Link } from "react-router-dom";
import Main from "./Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-info">
        <Link className="navbar-brand mb-0 h1 text-white" to="/">
          🧠 TechnicalTestTHC 🦄
        </Link>
      </nav>
      <div className="d-flex h-100">
        <ul className="nav flex-column bg-light">
          <li className="nav-item">
            <Link className="nav-link text-reset text-center" to="/users">
              <FontAwesomeIcon icon="user" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-reset text-center" to="/teams">
              <FontAwesomeIcon icon="people-group" />
            </Link>
          </li>
        </ul>
        <Main />
      </div>
    </>
  );
}
