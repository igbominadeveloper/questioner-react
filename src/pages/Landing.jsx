import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//components
import Layout from '../components/presentationals/Layout';

//stylesheets
import '../assets/css/LandingPage.css';

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div>
          <header className="banner mt-0" data-test="header" />
          <div className="banner-text flex flex-column">
            <div className="view-more flex flex-column banner-buttons center mt-120">
              <p className="text-heavy banner-title" data-test="banner-title">
                Questioner
              </p>
              <p className="banner-body">
                Crowd-sourcing questions for meetups
              </p>
            </div>
            <div className="view-more flex flex-row banner-buttons center">
              <Link to="/register.html" data-test="signup">
                <div className="btn-primary shadow">Sign up</div>
              </Link>
            </div>
          </div>
          <div className="view-more">
            <div className="meetups-heading">Latest Meetups</div>
          </div>
        </div>

        <div className="meetup-wrapper">
          <Link to="/meetup.html">
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
          </Link>

          <Link to="/meetup.html">
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
          </Link>

          <Link to="/meetup.html">
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
          </Link>

          <Link to="/meetup.html">
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
          </Link>

          <Link to="/meetup.html">
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
          </Link>

          <Link to="/meetup.html">
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
          </Link>
          <Link to="/meetup.html">
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
          </Link>
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
      </Layout>
    );
  }
}

export default HomePage;