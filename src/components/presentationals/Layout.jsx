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
      // this.props.autoLogin();
    }
  }

  logOut = event => {
    event.preventDefault();
    // this.props.logout();
  };

  render() {
    const { children, authUser } = this.props;
    const Children = children;
    return (
      <div>
        <div className="container-fluid" data-test="container-fluid">
          <NavBar
            data-test="navbar"
            authenticatedUser={authUser}
            onClick={this.logOut}
          />
          <div>{Children}</div>
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

export default connect(
  mapStateToProps,
  { autoLogin, logout },
)(Layout);
