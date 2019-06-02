import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

//helpers
import { getItem } from '../../utils/helpers';

//modules
import { autoLogin, logout } from '../../store/modules/auth';

//components
import NavBar from './Navbar/Navbar';
import Footer from './Footer/Footer';

export class Layout extends Component {
  componentDidMount() {
    const token = getItem('token');
    const user = getItem('user');
    if (token && user) {
      this.props.autoLogin();
    }
  }

  logOut = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { children, authUser } = this.props;
    return (
      <div>
        <div className="container-fluid" data-test="container-fluid">
          <NavBar
            data-test="navbar"
            authenticatedUser={authUser}
            onClick={this.logOut}
          />
          <div>{children}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  authUser: state.auth.loggedInUser,
  isLoading: state.auth.isLoading,
});
// const mapDispatchToProps = dispatch => ({
//   signin: () => dispatch(autoLogin),
//   signout: () => dispatch(logout),
// });

export default connect(
  mapStateToProps,
  { autoLogin, logout },
)(Layout);
