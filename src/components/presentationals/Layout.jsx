import React, { Fragment } from 'react';

import NavBar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="container-fluid" data-test="container-fluid">
        <NavBar data-test="navbar" />
        {children}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
