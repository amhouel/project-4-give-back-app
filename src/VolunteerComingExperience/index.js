import React, { Component } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import VolunteerExperienceDetails from '../VolunteerExperienceDetails';

class VolunteerComingExperience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isButtonClicked: false
    }
  }

  handleClick = () => {
    this.setState({
      isButtonClicked: true
    })
  }

  handleCancel = () => {
    this.setState({
      isButtonClicked: false
    });
  }

  handleRating = event => {
    event.preventDefault();
    this.props.updateRating(event.target.value)
  }

  handleComment = event => {
    event.preventDefault();
    this.props.updateComment(event.target.value)
  }

  submitRating = event => {
    event.preventDefault();
    this.props.completedExperience(event);
    this.setState({
      isButtonClicked: false
    })
  }

  render() {
    return (
      <div className="volunteer-coming-experience-wrapper">
        <li className="volunteer-experience-item"><Link className="volunteer-experience-detail-link" to={`/volunteer/experiences/${this.props.id}`}>{this.props.title}</Link></li>
        <PrivateRoute path={`/volunteer/experiences/${this.props.id}`} exact component={VolunteerExperienceDetails} />
        <button className="delete-button" onClick={this.props.deleteExperience}>Delete</button>
        <button className="completed-button" onClick={this.handleClick}>Completed</button>
        {this.state.isButtonClicked &&
          <form className="volunteer-experience-rating-form">
            <label className="rating-label">Rate your experience (out of 5)</label><br />
            <input className="rating-input" type="text" name="rating" placeholder="Rating" value={this.rating} onChange={this.handleRating} /><br />
            <label className="comment-label">Leave a comment:</label><br />
            <textarea className="comment-text" name="comment" placeholder="Comment" value={this.comment} onChange={this.handleComment}></textarea><br />
            <button className="submit-button" onClick={this.submitRating}>Submit</button>
            <button className="cancel-button" onClick={this.handleCancel}>Cancel</button>
          </form>
        }
      </div>
    )
  }
}
export default VolunteerComingExperience;