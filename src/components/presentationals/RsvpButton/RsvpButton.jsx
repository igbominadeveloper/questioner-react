import React from 'react';

const RsvpButton = ({ onClick, className, text }) => (
  <p className="p-1 border br-20 mr-5" onClick={onClick}>
    <a href="#" className={`text-heavy p-10 br-20 ${className}`}>
      {text}
    </a>
  </p>
);

export default RsvpButton;
