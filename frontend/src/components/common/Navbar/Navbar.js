import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle';

import './Navbar.scss';

const Navbar = props => {
  const { user, handleLogout } = props;

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {user ? (
            <>
              <ul className="navbar-nav nav-item-flex mb-lg-0">
                <div className="ms-lg-2">
                  <li className="p-2">
                    <NavLink to="/dashboard" className="nav-link">
                      Home
                    </NavLink>
                  </li>
                </div>
                <div className="nav-item-flex me-lg-2">
                  <li className="p-2 w-100">
                    <NavLink
                      to="/myprofile"
                      className="nav-link"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="My Profile"
                    >
                      {user.firstName}
                    </NavLink>
                  </li>
                  {user.role === 'admin' && (
                    <li className="p-2 w-100">
                      <NavLink to="/admin" className="nav-link">
                        Adminisztrátor
                      </NavLink>
                    </li>
                  )}
                  <li className="p-2 w-100">
                    <NavLink to="/" className="nav-link" onClick={handleLogout}>
                      Kilépés
                    </NavLink>
                  </li>
                </div>
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav nav-item-flex mb-lg-0">
                <div className="ms-lg-2">
                  <li className="p-2">
                    <NavLink to="/" exact className="nav-link">
                      Home
                    </NavLink>
                  </li>
                </div>
                <div className="nav-item-flex me-lg-2">
                  <li className="p-2 w-100">
                    <NavLink to="/register" className="nav-link">
                      Regisztráció
                    </NavLink>
                  </li>
                  <li className="p-2 w-100">
                    <NavLink exact to="/login" className="nav-link">
                      Bejelentkezés
                    </NavLink>
                  </li>
                </div>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
