import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Question from '../../presentationals/Question/Question';
import {
  getQuestions,
  createNewQuestion,
  questionVote,
} from '../../../store/modules/question';
import { checkAndRedirect } from '../../../store/modules/auth';

export class Questions extends Component {
  componentDidMount() {
    this.props.getQuestions(this.props.meetup);
  }
  state = {
    question: '',
  };

  inputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  questionSubmitHandler = event => {
    const { isAuthenticated, location, history } = this.props;
    event.preventDefault();
    if (!isAuthenticated) {
      return this.props.checkAndRedirect(location.pathname, history);
    }
    this.props.createNewQuestion(
      'New Question',
      this.state.question,
      this.props.meetup,
    );
    this.setState({ question: '' });
  };

  submitVote = (decision, questionId) => {
    const { isAuthenticated, location, history } = this.props;
    if (!isAuthenticated) {
      return this.props.checkAndRedirect(location.pathname, history);
    }
    this.props.questionVote(decision, questionId);
  };

  render() {
    const { questions } = this.props;
    return (
      <Fragment>
        {questions &&
          questions.length > 0 &&
          questions.map(question => (
            <Question
              question={question}
              key={question.id}
              submitVote={this.submitVote}
            />
          ))}
        <div className="new-question">
          <form
            id="question-form"
            className="flex flex-column"
            onSubmit={this.questionSubmitHandler}
          >
            <div className="form-group">
              <textarea
                className="form-control"
                name="question"
                id="question"
                placeholder="Your Question"
                onChange={this.inputHandler}
                value={this.state.question}
                required
              />
            </div>
            <button className="btn-primary p-1 shadow">post</button>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.question.questions,
  isAuthenticated: state.auth.token !== null,
  isLoading: state.meetup.isLoading,
});

export default connect(
  mapStateToProps,
  { getQuestions, createNewQuestion, questionVote, checkAndRedirect },
)(withRouter(Questions));
