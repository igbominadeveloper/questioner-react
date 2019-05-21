import React from 'react';

import NavBar from './Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
