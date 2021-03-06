import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//modules
import { loginUser } from '../../../store/modules/auth';

//components
import Layout from '../../presentationals/Layout';

//stylesheets
import '../../../assets/css/Form.css';
import { getItem } from '../../../utils/helpers';
import Loader from '../../presentationals/Loader/Loader';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const { password, email } = this.state;
    const redirectUrl = getItem('redirectUrl') || '/';
    this.props.loginUser({ email, password }, redirectUrl, this.props.history);
  };
  render() {
    return (
      <Layout>
        {this.props.isLoading && <Loader />}
        <div className="container">
          <div id="registration-form" className="shadow" data-test="login-form">
            <form onSubmit={this.submitHandler} className="form">
              <p className="form-header">Welcome! Login here</p>
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
                <button
                  className="form-control btn-primary shadow"
                  data-test="submit-button"
                >
                  Log in
                </button>
              </div>
            </form>
            <p className="form-footer">
              <span>Don't have an account? </span>
              <Link to="/signup" className="form-link text-primary">
                Sign up
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
  { loginUser },
)(withRouter(Login));
