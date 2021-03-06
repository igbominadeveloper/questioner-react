import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer data-test="footer">
      {/* <div className="footer-content flex text-white flex-row">
        <div className="logo">
          <div className="footer-groups flex flex-column">
            <div className="footer-group-title">Questioner Logo</div>
          </div>
        </div>
        <div className="flex flex-row space-between links">
          <div className="footer-groups flex flex-column">
            <div className="footer-group-title">Questioner</div>
            <Link to="/#">
              <p>About us</p>
            </Link>
            <Link to="/#">
              <p>How it works</p>
            </Link>
            <Link to="/#">
              <p>Contact us</p>
            </Link>
          </div>
          <div className="footer-groups flex flex-column">
            <div className="footer-group-title">Account</div>
            <Link to="/signup">
              <p>Sign up</p>
            </Link>
            <Link to="/login">
              <p>Sign in</p>
            </Link>
            <Link to="#">
              <p>Password reset</p>
            </Link>
          </div>
          <div className="footer-groups flex flex-column">
            <div className="footer-group-title">Quick Links</div>
            <Link to="#">
              <p>All meetups</p>
            </Link>
            <Link to="#">
              <p>Upcoming</p>
            </Link>
            <Link to="/#">
              <p>Latest</p>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="copyright bg-white p-10">
        <p className="text-center">
          Made with <i className="fa fa-heart text-danger" />
          by &nbsp;
          <a
            href="https://github.com/igbominadeveloper"
            target="_blank"
            className="github"
          >
            igbominadeveloper
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
