import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getItem } from '../../../../utils/helpers';
const AdminWrapper = ({ component: Component, history, location, ...rest }) => {
  const isAdmin = JSON.parse(getItem('user')).isadmin === 1;
  return (
    <Route
      {...rest}
      render={props =>
        isAdmin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default withRouter(AdminWrapper);
