import React, { Component } from 'react';

//components
import Layout from '../components/presentationals/Layout';

//stylesheets
import '../assets/css/LandingPage.css';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div>
          <header className="banner mt-0" />
          <div className="banner-text flex flex-column">
            <div className="view-more flex flex-column banner-buttons center mt-120">
              <p className="text-heavy banner-title">Questioner</p>
              <p className="banner-body">
                Crowd-sourcing questions for meetups
              </p>
            </div>
            <div className="view-more flex flex-row banner-buttons center">
              <a href="register.html">
                <div className="btn-primary shadow">Sign up</div>
              </a>
            </div>
          </div>
          <div className="view-more">
            <div className="meetups-heading">Latest Meetups</div>
          </div>
        </div>

        <div className="meetup-wrapper">
          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="laravel" />
              <p className="meetup-title">Laravel Nigeria Meetup</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>

          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="forloop" />
              <p className="meetup-title">ForLoop Ilorin</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>

          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="mocha" />
              <p className="meetup-title">Mocha Akure</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>

          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="vue" />
              <p className="meetup-title">Vue JS Lagos Meetup</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>

          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="laravel" />
              <p className="meetup-title">Laravel Nigeria Meetup</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>

          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="mocha" />
              <p className="meetup-title">Mocha Akure</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>
          <a href="meetup.html">
            <div className="meetup shadow pb-2">
              <div className="meetup-image" id="vue" />
              <p className="meetup-title">Vue JS Lagos Meetup</p>
              <p className="meetup-date text-light">
                <i className="fa fa-calendar" />
                Thursday, December 20, 9:00 AM
              </p>
              <p className="meetup-location text-light">
                <i className="fa fa-map-marker" />
                Zone Tech Park, Gbagada, Lagos
              </p>
            </div>
          </a>
        </div>
        <div className="view-more" />
        <div className="how-to flex-column text-white">
          <div className="how-to-title">How Questioner works</div>
          <div className="how-to-details flex flex-row center">
            <article className="flex width-40 space-around">
              <div className="icon">
                <i className="fa fa-2x fa-question text-primary" />
              </div>
              <div className="content">
                <p className="text-left">Find any interesting one?</p>
                <p className="text-small text-left">
                  Ask your pertinent questions and upvote any to catch the
                  organizer's attention
                </p>
                <p className="text-left text-primary text">Sign up</p>
              </div>
            </article>
            <article className="flex width-40 space-around">
              <div className="icon">
                <i className="fa fa-2x fa-check text-primary" />
              </div>
              <div className="content">
                <p className="text-left">Ready to book a place?</p>
                <p className="text-small text-left">
                  You can rsvp on any meetup, better you can change your
                  decision anytime
                </p>
                <p className="text-left text-primary text">Book a place</p>
              </div>
            </article>
          </div>
        </div>
        <div className="above-footer flex">
          <div className="view-more flex flex-row banner-buttons space-between">
            <div className="btn-primary shadow">Sign up</div>
          </div>
        </div>
        <footer>
          <div className="footer-content flex text-white flex-row">
            <div className="logo">
              <div className="footer-groups flex flex-column">
                <div className="footer-group-title">Questioner Logo</div>
              </div>
            </div>
            <div className="flex flex-row space-between links">
              <div className="footer-groups flex flex-column">
                <div className="footer-group-title">Questioner</div>
                <a href="#">
                  <p>About us</p>
                </a>
                <a href="#">
                  <p>How it works</p>
                </a>
                <a href="#">
                  <p>Contact us</p>
                </a>
              </div>
              <div className="footer-groups flex flex-column">
                <div className="footer-group-title">Account</div>
                <a href="register.html">
                  <p>Sign up</p>
                </a>
                <a href="login.html">
                  <p>Sign in</p>
                </a>
                <a href="password-reset.html">
                  <p>Password reset</p>
                </a>
              </div>
              <div className="footer-groups flex flex-column">
                <div className="footer-group-title">Quick Links</div>
                <a href="meetups.html">
                  <p>All meetups</p>
                </a>
                <a href="#">
                  <p>Upcoming</p>
                </a>
                <a href="#">
                  <p>Latest</p>
                </a>
              </div>
            </div>
          </div>
          <div className="copyright bg-white p-10">
            <p className="text-center">
              Made with <i className="fa fa-heart text-danger" />
              by &nbsp;
              <a href="https://github.com/igbominadeveloper" className="github">
                igbominadeveloper
              </a>
            </p>
          </div>
        </footer>
      </Layout>
    );
  }
}

export default HomePage;
