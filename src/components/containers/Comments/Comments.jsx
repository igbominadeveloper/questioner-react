import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

//components
import Comment from '../../presentationals/Comment/Comment';
import Loader from '../../presentationals/Loader/Loader';

//modules
import { checkAndRedirect } from '../../../store/modules/auth';
import { createNewComment } from '../../../store/modules/question';
export class Comments extends Component {
  state = {
    comment: '',
  };

  inputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  commentSubmitHandler = event => {
    const { isAuthenticated, location, history } = this.props;
    event.preventDefault();
    if (!isAuthenticated) {
      return this.props.checkAndRedirect(location.pathname, history);
    }
    this.props.createNewComment({
      question_id: this.props.question,
      comment: this.state.comment,
    });
    this.setState({ comment: '' });
  };

  render() {
    const { comments, isLoading } = this.props;
    return (
      <div className="question-comments">
        {isLoading && <Loader />}
        {comments &&
          comments.length > 0 &&
          comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}
        <div className="new-comment">
          <form
            action=""
            id="comment-form"
            className="flex flex-column"
            onSubmit={this.commentSubmitHandler}
          >
            <div className="form-group">
              <textarea
                className="form-control"
                name="comment"
                id="comment"
                value={this.state.comment}
                placeholder="Your comment"
                required
                onChange={this.inputHandler}
              />
            </div>
            <button className="btn-primary p-1 shadow">post</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.question.isLoading,
});

export default connect(
  mapStateToProps,
  { checkAndRedirect, createNewComment },
)(withRouter(Comments));
