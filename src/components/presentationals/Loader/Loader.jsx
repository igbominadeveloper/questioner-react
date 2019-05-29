import React from 'react';

import Spinner from '../../../assets/images/loader.svg';
const Loader = () => {
  return (
    <div className="loader-overlay">
      <img src={Spinner} className="loader" />
    </div>
  );
};

export default Loader;
