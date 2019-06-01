import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import moment from 'moment';

//components
import Layout from '../../components/presentationals/Layout';
import Questions from '../../components/containers/Questions/Questions';
import RsvpButton from '../../components/presentationals/RsvpButton/RsvpButton';

//modules
import { getSingleMeetup, recordRsvp } from '../../store/modules/meetup';
import { checkAndRedirect } from '../../store/modules/auth';

//config
import { DEFAULT_MEETUP_IMAGE } from '../../config/config';

export class SingleMeetup extends Component {
  componentDidMount() {
    if (Object.keys(this.props.meetup).length === 0) {
      this.props.getSingleMeetup(this.props.match.params.meetupId);
    }
  }

  rsvpHandler = decision => {
    const { history, isAuthenticated, location } = this.props;
    if (!isAuthenticated) {
      return this.props.checkAndRedirect(location.pathname, history);
    }
    this.props.recordRsvp(this.props.meetup.id, decision);
  };

  render() {
    const { meetup } = this.props;
    return (
      <Layout>
        {meetup && meetup.id && (
          <div className="single-meetup">
            <div className="meetup-header">
              <p className="meetup-title">{meetup.topic}</p>
              <div className="wrapper">
                <div className="organizer">
                  <div className="avatar bg-black">
                    <p>ID</p>
                  </div>
                  <div className="contact-details">
                    <p className="text-light">
                      Organised by{' '}
                      <a href="profile.html" className="text-black">
                        {meetup.organizer_name}
                      </a>
                    </p>
                    <p className="text-light">
                      <i className="fa fa-phone" />
                      {meetup.organizer_phone}
                    </p>
                    <p className="text-light">
                      <a href={`mailto:${meetup.organizer_email}`}>
                        <i className="fa fa-envelope" />
                        {meetup.organizer_email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="register flex align-items-end">
                  <RsvpButton
                    className="text-primary"
                    text="Register"
                    onClick={() => this.rsvpHandler('yes')}
                  />
                  <RsvpButton
                    className="text-warning"
                    text="Undecided"
                    onClick={() => this.rsvpHandler('maybe')}
                  />
                  <RsvpButton
                    className="text-danger"
                    text="Not Interested"
                    onClick={() => this.rsvpHandler('no')}
                  />
                </div>
              </div>
            </div>
            <section className="meetup-body">
              <div className="wrapper">
                <div className="single-meetup-image shadow br-5">
                  <img
                    src={meetup.images[0] || DEFAULT_MEETUP_IMAGE}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="meetup-stats br-5 flex flex-column center">
                  <div className="meetup-date mt-2 flex text-light">
                    <i className="fa fa-clock-o" />
                    <div className="date">
                      <p>{moment(meetup.date).format('LLL')}</p>
                    </div>
                  </div>
                  <div className="meetup-location mt-2 flex text-light">
                    <i className="fa fa-map-marker" />
                    <p>{meetup.location}</p>
                  </div>
                </div>
              </div>
              {meetup.description && (
                <article className="mt-5 m-20">
                  <h3 className="text-heavy">Description</h3>
                  <p className="text-light">{meetup.description}</p>
                </article>
              )}

              <article className="mt-5 meetup-questions m-20">
                <div className="question-title">
                  <h3 className="text-heavy">Questions</h3>
                </div>
                <div className="questions-list">
                  <Questions meetup={meetup.id} />
                </div>
              </article>
            </section>
          </div>
        )}
      </Layout>
    );
  }
}
const mapStateToProps = (state, props) => {
  const { meetupId } = props.match.params;
  return {
    isAuthenticated: state.auth.token !== null,
    meetup: state.meetup.meetups[meetupId] || {},
    isLoading: state.meetup.isLoading,
  };
};
export default connect(
  mapStateToProps,
  { getSingleMeetup, recordRsvp, checkAndRedirect },
)(withRouter(SingleMeetup));
