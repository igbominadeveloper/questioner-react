import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

//components
import Layout from '../../components/presentationals/Layout';
import Question from '../../components/presentationals/Question/Question';
import { getSingleMeetup } from '../../store/modules/meetup';
import { DEFAULT_MEETUP_IMAGE } from '../../config/config';

export class SingleMeetup extends Component {
  componentDidMount() {
    if (Object.keys(this.props.meetup).length === 0) {
      this.props.getSingleMeetup(this.props.match.params.meetupId);
    }
  }
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
                <div className="register flex">
                  <p className="p-1">
                    <a href="#" className="text-heavy p-10 br-20 text-primary">
                      Register
                    </a>
                  </p>
                  <p className="p-1">
                    <a href="#" className="p-10 br-20 text-warning">
                      Undecided
                    </a>
                  </p>
                  <p className="p-1">
                    <a href="#" className="p-10 br-20 text-danger">
                      Not Interested
                    </a>
                  </p>
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
              {meetup.questions && (
                <article className="mt-5 meetup-questions m-20">
                  <div className="question-title">
                    <h3 className="text-heavy">Questions</h3>
                  </div>
                  <div className="questions-list">
                    <Question />
                    <div className="new-question">
                      <form
                        action=""
                        id="question-form"
                        className="flex flex-column"
                      >
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            name="question"
                            id="question"
                            placeholder="Your Question"
                          />
                        </div>
                        <button className="btn-primary p-1 shadow">post</button>
                      </form>
                    </div>
                  </div>
                </article>
              )}
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
    meetup: state.meetup.meetups[meetupId] || {},
    isLoading: state.meetup.isLoading,
  };
};
export default connect(
  mapStateToProps,
  { getSingleMeetup },
)(SingleMeetup);
