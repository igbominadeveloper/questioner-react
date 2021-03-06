import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/css/App.css';
import '../../../assets/css/MediaQueries.css';
import '../../../assets/css/Utility.css';
const Navbar = ({ authenticatedUser, onClick }) => {
  return (
    <Fragment>
      <nav className="navbar" id="navbar-desktop" data-test="navbar">
        <div className="page-title">
          <Link to="/">
            <h3>Questioner</h3>
          </Link>
        </div>
        <div className="nav-links" data-test="nav-links">
          <ul>
            <li>
              <Link to="#">
                <span className="fa fa-meetup">Meetups</span>
              </Link>
            </li>
            {!authenticatedUser && (
              <>
                <li>
                  <Link to="/signup">
                    <span className="fa fa-user-plus">Sign up</span>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <span className="fa fa-user-plus">Sign in</span>
                  </Link>
                </li>
              </>
            )}
            {authenticatedUser && (
              <>
                {authenticatedUser.isadmin !== 1 ? (
                  <li>
                    <Link to="#">
                      <span className="fa fa-user">My Profile</span>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="#">
                        <span className="fa fa-user">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/organize">
                        <span className="fa fa-edit">Create Meetup</span>
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link to="#" onClick={onClick}>
                    <span className="fa fa-sign-out">Logout</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="bg-primary flex-row space-between pr-1 nav-mobile-parent text-white">
        <a href="#" id="nav-toggle" className="no-repeat h-0" />
        <div className="m-0 h-0">
          <a href="index.html" className="text-white">
            <p>Questioner</p>
          </a>
        </div>
        <div className="text-white m-0 h-0">
          <a href="login.html" className="text-white">
            <p>Sign in</p>
          </a>
        </div>
      </div>
      <nav className="navbar-collapse" id="navbar-mobile">
        <div>
          <ul className="flex flex-column text-left p-1">
            <li className="mt-1">
              <Link to="/meetups">Meetups</Link>
            </li>
            <li className="mt-1">
              <Link to="/login">Login</Link>
            </li>
            <li className="mt-1">
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
