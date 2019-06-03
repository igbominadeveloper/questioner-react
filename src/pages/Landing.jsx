import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//components
import Layout from '../components/presentationals/Layout';
import MeetupCard from '../components/presentationals/MeetupCard/MeetupCard';
import Loader from '../components/presentationals/Loader/Loader';

//stylesheets
import '../assets/css/LandingPage.css';

//modules
import { getUpcomingMeetups } from '../store/modules/meetup';

export class HomePage extends Component {
  componentDidMount() {
    const { upcomingMeetups } = this.props;
    if (Object.keys(upcomingMeetups).length < 1) {
      this.props.getUpcomingMeetups();
    }
  }

  render() {
    let content;
    const { upcomingMeetups, isAuthenticated, isLoading } = this.props;
    {
      isLoading
        ? (content = <Loader />)
        : (content = (
            <Layout>
              <div>
                <header className="banner mt-0" data-test="header" />
                <div className="banner-text flex flex-column">
                  <div className="view-more flex flex-column banner-buttons center mt-120">
                    <p
                      className="text-heavy banner-title"
                      data-test="banner-title"
                    >
                      Questioner
                    </p>
                    <p className="banner-body">
                      Crowd-sourcing questions for meetups
                    </p>
                  </div>
                  <div className="view-more flex flex-row banner-buttons center">
                    {isAuthenticated ? (
                      <Link to="#" data-test="getting-started">
                        <div className="btn-primary shadow">Get Started</div>
                      </Link>
                    ) : (
                      <Link to="/signup" data-test="signup">
                        <div className="btn-primary shadow">Sign up</div>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="view-more">
                  <div className="meetups-heading">Upcoming Meetups</div>
                </div>
              </div>
              <div className="meetup-wrapper">
                {upcomingMeetups &&
                  upcomingMeetups.length > 0 &&
                  upcomingMeetups.map(meetup => (
                    <Link to={`/meetup=${meetup.id}`} key={meetup.id}>
                      <MeetupCard values={meetup} key={meetup.id} />
                    </Link>
                  ))}
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
                      <p className="text-left text-primary text">
                        Book a place
                      </p>
                    </div>
                  </article>
                </div>
              </div>
              <div className="above-footer flex center">
                {isAuthenticated ? (
                  <Link to="#" data-test="getting-started">
                    <div className="view-more flex flex-row banner-buttons space-between">
                      <div className="btn-primary shadow">Get Started</div>
                    </div>
                  </Link>
                ) : (
                  <Link to="/signup" data-test="signup">
                    <div className="view-more flex flex-row banner-buttons space-between">
                      <div className="btn-primary shadow">Sign up</div>
                    </div>
                  </Link>
                )}
              </div>
            </Layout>
          ));
    }
    return content;
  }
}

const mapStateToProps = state => ({
  isLoading: state.meetup.isLoading,
  upcomingMeetups: state.meetup.upcomingMeetups,
  isAuthenticated: state.auth.token !== null,
});

export default connect(
  mapStateToProps,
  { getUpcomingMeetups },
)(HomePage);
