import React from 'react';
import moment from 'moment';

const Comment = ({ comment }) => {
  return (
    <div className="single-comment flex p-1">
      <div className="avatar bg-black">
        <p>
          {comment.user.firstname.charAt(0).toUpperCase()}
          {comment.user.lastname.charAt(0).toUpperCase()}
        </p>
      </div>
      <div className="comment-details">
        <div className="comment-content">
          <div className="upper-details flex space-between">
            <p className="comment-user">
              <a href="#" className="text-black text-bold">
                {comment.user.firstname}&nbsp;
                {comment.user.lastname}
              </a>
            </p>
            <p className="text-light comment-time">
              <i className="fa fa-clock-o" />
              {moment(comment.created_at).fromNow()}
            </p>
          </div>
          <p className="text-light mt-1">{comment.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
