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
      console.log(this.props);
      // this.props.autoLogin();
    }
  }

  logOut = event => {
    event.preventDefault();
    console.log(this.props);
    // this.props.logout();
  };

  render() {
    const { children, authUser } = this.props;
    return (
      <Fragment>
        <div className="container-fluid" data-test="container-fluid">
          <NavBar
            data-test="navbar"
            authenticatedUser={authUser}
            onClick={this.logOut}
          />
          {children}
        </div>
        <Footer />
      </Fragment>
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
