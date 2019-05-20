import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../../../store/modules/auth';

export class Signup extends Component {
  render() {
    return <p>Welcome to the sign up page</p>;
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
