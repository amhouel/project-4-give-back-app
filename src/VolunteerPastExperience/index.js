import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VolunteerExperienceDetails from '../VolunteerExperienceDetails';
import './style.css';

class VolunteerPastExperience extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rating: undefined,
    }
  }

  componentDidMount = async () => {
    this.fetchVolunteerPastExperience();
  }

  fetchVolunteerPastExperience = async () => {
    const id = this.props.id;
    const pastExperience = await (await fetch(`/api/volunteer/experiences/${id}`, {
      headers: {
        'jwt-token': localStorage.getItem('user-jwt')
      }
    })).json();
    this.setState({
      rating: pastExperience.rating
    });
  }

  calculateStarRating = () => {
    let starRating = '';
    for (let i = 0; i < this.state.rating; i++) {
      starRating += '⭐️'
    }
    return starRating;
  }

  render() {
    return (
      <div className="volunteer-past-experience-wrapper">
        <li className="volunteer-past-experience-item"><Link className="volunteer-experience-detail-link" to={`/volunteer/experiences/${this.props.id}`}>{this.props.title}</Link></li>
        <Route path={`/volunteer/experiences/${this.props.id}`} exact component={VolunteerExperienceDetails} />
        <p className="volunteer-past-experience-star-rating">{this.calculateStarRating()}</p>
        <button className="delete-button" onClick={this.props.deleteExperience}>Delete</button>
      </div>
    )
  }
}
export default VolunteerPastExperience;