import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import Layout from '../../presentationals/Layout';
import Loader from '../../presentationals/Loader/Loader';

import { createNewMeetup } from '../../../store/modules/meetup';
import { uploadImageToServer } from '../../../api/meetup';
class NewMeetup extends Component {
  state = {
    meetup: {
      topic: '',
      description: '',
      location: '',
      date: '',
      organizerName: '',
      organizerEmail: '',
      organizerPhone: '',
      images: '',
      tags: '',
    },
    isLoading: false,
  };
  changeHandler = event => {
    this.setState({
      meetup: {
        ...this.state.meetup,
        [event.target.name]: event.target.value,
      },
    });
  };

  submitHandler = async event => {
    event.preventDefault();
    const file = document.querySelector("input[name='images']").files[0];

    if (file.size === 0) {
      return swal('image must be specified', 'error', 'error');
    }

    if (file.size > 0) {
      const response = await uploadImageToServer({
        image: file,
        tag: 'meetup_image',
      });

      this.setState({
        meetup: {
          ...this.state.meetup,
          images: response,
        },
      });

      this.props.createNewMeetup(this.state.meetup, this.props.history);
    }
  };
  render() {
    return (
      <Layout>
        <div className="meetup-form card mw-5 m-20 p-25">
          <form onSubmit={this.submitHandler}>
            <p className="text-light form-header m-20">Schedule a meetup</p>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="topic"
                placeholder="Topic"
                value={this.state.meetup.topic}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="file"
                className="form-control"
                name="images"
                placeholder="Banner"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="organizerName"
                placeholder="Organizer's Name"
                value={this.state.meetup.organizerName}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="organizerPhone"
                placeholder="Organizer's PhoneNumber"
                value={this.state.meetup.organizerPhone}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="organizerEmail"
                placeholder="Organizer's Email"
                value={this.state.meetup.organizerEmail}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="date"
                className="form-control"
                name="date"
                placeholder="date"
                value={this.state.meetup.date}
                onChange={this.changeHandler}
                required
              />
            </div>
            {this.state.isLoading && <Loader />}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="location"
                placeholder="Location"
                value={this.state.meetup.location}
                onChange={this.changeHandler}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                onChange={this.changeHandler}
                value={this.state.meetup.description}
                name="description"
                cols="30"
                rows="10"
                className="form-control"
                placeholder="The juicy highlights go here"
                required
              />
            </div>
            <button
              className="btn-primary container-fluid p-10"
              disabled={this.state.isLoading}
            >
              Schedule
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  authUser: state.auth.loggedInUser,
  isLoading: state.meetup.isLoading,
});

export default connect(
  mapStateToProps,
  { createNewMeetup },
)(NewMeetup);
