import React from 'react';

const Question = () => {
  return (
    <div className="question flex p-1 flex-column">
      <div className="question-body flex">
        <div className="avatar bg-black">
          <p>ID</p>
        </div>
        <div className="question-details">
          <div className="question-content">
            <div className="upper-details flex space-between">
              <p className="question-user">
                <a href="profile.html" className="text-black">
                  Igbominadeveloper
                </a>
              </p>
              <p className="text-light question-time">
                <i className="fa fa-clock-o" />2 months ago
              </p>
            </div>
            <p className="text-light mt-1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Assumenda laborum cumque praesentium impedit obcaecati est eaque
              consectetur nisi tempore cupiditate?
            </p>
          </div>
          <div className="question-stats flex space-between mt-1">
            <p className="comment text-light">
              <i className="fa fa-reply" />1
            </p>
            <p className="like text-light upvote">
              <i className="fa fa-thumbs-o-up" />
              <span>5</span>
            </p>
            <p className="dislike text-light">
              <i className="fa fa-thumbs-o-down" />
              <span>1</span>
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
