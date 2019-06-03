import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//modules
import { signupUser } from '../../../store/modules/auth';

//components
import Layout from '../../presentationals/Layout';

//stylesheets
import '../../../assets/css/Form.css';
import swal from 'sweetalert';
import { getItem } from '../../../utils/helpers';
import Loader from '../../presentationals/Loader/Loader';

export class Signup extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const {
      password,
      passwordConfirmation,
      email,
      firstname,
      lastname,
    } = this.state;
    if (password !== passwordConfirmation) {
      swal('passwords do not match', '', 'error');
      return;
    }
    const redirectUrl = getItem('redirectUrl') || '/';
    this.props.signupUser(
      { email, password, firstname, lastname },
      redirectUrl,
      this.props.history,
    );
  };
  render() {
    return (
      <Layout>
        {this.props.isLoading && <Loader />}
        <div className="container">
          <div id="registration-form" className="shadow" data-test="reg-form">
            <form onSubmit={this.submitHandler} className="form">
              <p className="form-header">Welcome! Signup here</p>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.changeHandler}
                  id="firstname"
                  placeholder="Firstname"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.changeHandler}
                  id="lastname"
                  placeholder="Lastname"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.changeHandler}
                  id="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.changeHandler}
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  onChange={this.changeHandler}
                  id="passwordConfirmation"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="form-group">
                <button className="form-control btn-primary shadow">
                  Sign up
                </button>
              </div>
            </form>
            <p className="form-footer">
              <span>Have an account? </span>
              <Link to="/login" className="form-link text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { signupUser },
)(Signup);
