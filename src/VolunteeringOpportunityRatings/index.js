import React, { Component } from 'react';
import './style.css';

class VolunteeringOpportunityRatings extends Component {
  render() {
    return (
        <div className="volunteering-opportunity-feedback">
        <p volunteering-opportunity-rating-username>{this.props.username}</p>
        <p className="date">{this.props.date}</p>
        <p className="volunteering-opportunity-rating-title">Rating:</p>
        <p className="volunteering-opportunity-rating">{this.props.starRating}</p>
        <p className="volunteering-opportunity-comment-title">Comment:</p>
        <p className="volunteering-opportunity-comment">{this.props.comment}</p>
    </div>
    )
  }
}

export default VolunteeringOpportunityRatings;