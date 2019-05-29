import React from 'react';
import moment from 'moment';

import Image from '../Image/Image';
import { DEFAULT_MEETUP_IMAGE } from '../../../config/config';
const MeetupCard = ({ values }) => {
  return (
    <div className="meetup shadow pb-2">
      <div className="meetup-image">
        <Image url={values.images[0] || DEFAULT_MEETUP_IMAGE} />
      </div>
      <p className="meetup-title">{values.topic}</p>
      <p className="meetup-date text-light">
        <i className="fa fa-calendar" />
        {moment(values.date).format('LL')}
      </p>
      <p className="meetup-date text-light">
        <i className="fa fa-clock-o" />
        {moment(values.date).format('hh:mm a')}
      </p>
      <p className="meetup-location text-light">
        <i className="fa fa-map-marker" />
        {values.location}
      </p>
    </div>
  );
};

export default MeetupCard;
