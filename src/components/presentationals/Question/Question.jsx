import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Question = ({ question, submitVote }) => {
  return (
    <div className="question flex p-1 flex-column">
      <div className="question-body flex">
        <div className="avatar bg-black">
          <p>
            {question.user.firstname.charAt(0).toUpperCase()}
            {question.user.lastname.charAt(0).toUpperCase()}
          </p>
        </div>
        <div className="question-details">
          <div className="question-content">
            <div className="upper-details flex space-between text-bold">
              <p className="question-user">
                <Link to="#" className="text-black">
                  {question.user.firstname}&nbsp;
                  {question.user.lastname}
                </Link>
              </p>
              <p className="text-light question-time">
                <i className="fa fa-clock-o" />
                {moment(question.created_at).fromNow()}
              </p>
            </div>
            <p className="text-light mt-1">{question.body}</p>
          </div>
          <div className="question-stats flex space-between mt-1">
            <p className="comment text-light">
              <i className="fa fa-reply" />0
            </p>
            <p
              className="like text-light upvote"
              onClick={() => submitVote('upvote', question.id)}
            >
              <i className="fa fa-thumbs-o-up" />
              <span>{question.upvotes}</span>
            </p>
            <p
              className="dislike text-light"
              onClick={() => submitVote('downvote', question.id)}
            >
              <i className="fa fa-thumbs-o-down" />
              <span>{question.downvotes}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="question-comments">
        <div className="single-comment flex p-1">
          <div className="avatar bg-black">
            <p>ID</p>
          </div>
          <div className="comment-details">
            <div className="comment-content">
              <div className="upper-details flex space-between">
                <p className="comment-user">
                  <a href="profile.html" className="text-black">
                    Igbominadeveloper
                  </a>
                </p>
                <p className="text-light comment-time">
                  <i className="fa fa-clock-o" />2 months ago
                </p>
              </div>
              <p className="text-light mt-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Assumenda laborum cumque praesentium impedit obcaecati est eaque
                consectetur nisi tempore cupiditate?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="new-comment">
        <form action="" id="comment-form" className="flex flex-column">
          <div className="form-group">
            <textarea
              className="form-control"
              name="comment"
              id="comment"
              placeholder="Your comment"
            />
          </div>
          <button className="btn-primary p-1 shadow">post</button>
        </form>
      </div>
    </div>
  );
};

export default Question;
