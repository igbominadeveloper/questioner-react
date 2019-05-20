import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../../../store/modules/auth';

import Navbar from '../../presentationals/Navbar/Navbar';
export class Signup extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isloading: state.auth.isLoading,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { signupUser },
)(Signup);
