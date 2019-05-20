import React, { Fragment } from 'react';

import '../../../assets/css/App.css';
import '../../../assets/css/MediaQueries.css';
import '../../../assets/css/Utility.css';
const Navbar = () => {
  return (
    <Fragment>
      <nav className="navbar" id="navbar-desktop">
        <div className="page-title">
          <h3>Questioner</h3>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="meetups.html">
                <span className="fa fa-meetup">Meetups</span>
              </a>
            </li>
            <li>
              <a href="register.html">
                <span className="fa fa-user-plus">Sign up</span>
              </a>
            </li>
            <li>
              <a href="login.html">
                <span className="fa fa-user-plus">Sign in</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="navbar-collapse" id="navbar-mobile">
        <div>
          <ul className="flex flex-column text-left p-1">
            <li className="mt-1">
              <a href="meetups.html">Meetups</a>
            </li>
            <li className="mt-1">
              <a href="login.html">Login</a>
            </li>
            <li className="mt-1">
              <a href="register.html">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
