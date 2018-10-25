import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchNav from '../SearchNav';
import Volunteer from '../Volunteer';
import VolunteerExperienceDetailsMap from '../VolunteerExperienceDetailsMap';
import './style.css';

class VolunteerExperienceDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            volunteerExperience: {},
            volunteerExperienceRating: undefined,
            volunteerExperienceComment: '',
            volunteerOpportunity: {},
            isButtonClicked: false,
            noRatingMessage: ''
        }
    }

    componentDidMount = async () => {
        this.fetchVolunteerExperience();
        this.fetchVolunteerExperienceInfo();
    }

    fetchVolunteerExperience = async () => {
        const id = this.props.match.params.id;
        const volunteerExperience = await (await fetch(`/api/volunteer/experiences/${id}`, {
            headers: {
                'jwt-token': localStorage.getItem('user-jwt')
            }
        })).json();
        this.setState({
            volunteerExperience: volunteerExperience,
            volunteerExperienceRating: volunteerExperience.rating,
            volunteerExperienceComment: volunteerExperience.comment,
        });
    }

    fetchVolunteerExperienceInfo = async () => {
        const id = this.props.match.params.id;
        const volunteerOpportunity = await (await fetch(`/api/volunteer/opportunities/${id}`, {
            headers: {
                'jwt-token': localStorage.getItem('user-jwt')
            }
        })).json();
        this.setState({
            volunteerOpportunity: volunteerOpportunity
        });
    }


    calculateStarRating = () => {
        let starRating = '';
        for (let i = 0; i < this.state.volunteerExperience.rating; i++) {
            starRating += '⭐️'
        }
        return starRating;
    }

    handleClick = () => {
        this.setState({
            isButtonClicked: true
        });
    }

    handleCancel = () => {
        this.setState({
            isButtonClicked: false,
        });
    }

    handleRating = event => {
        event.preventDefault();
        this.setState({
            volunteerExperienceRating: event.target.value,
        });
    }

    handleComment = event => {
        event.preventDefault();
        this.setState({
            volunteerExperienceComment: event.target.value,
        });
    }

    submitRating = async event => {
        event.preventDefault();
        const body = JSON.stringify({
            experienceId: this.props.match.params.id,
            rating: this.state.volunteerExperienceRating,
            comment: this.state.volunteerExperienceComment
        });

        await fetch('/api/volunteer/experiences', {
            method: "POST",
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
        this.fetchVolunteerExperience();
        this.fetchVolunteerExperienceInfo();
        this.setState({
            isButtonClicked: true,
        });
    }

    submitComment = async event => {
        event.preventDefault();
        const body = JSON.stringify({
            experienceId: this.props.match.params.id,
            comment: this.state.volunteerExperienceComment
        });

        await fetch('/api/volunteer/experiences/comment', {
            method: "POST",
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
        this.fetchVolunteerExperience();
        this.fetchVolunteerExperienceInfo();
    }

    deleteExperience = async () => {
        const id = this.props.match.params.id;
        const deletedExperience = await fetch('/api/volunteer/experiences', {
            method: "DELETE",
            body: JSON.stringify({ experienceId: id }),
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
    }

    render() {
        const { title, organization, organizationURL, description, address, duration } = this.state.volunteerOpportunity;
        const { rating, comment } = this.state.volunteerExperience;
        return (
            <div >
                <div className="volunteer-experience-details-wrapper">
                    <div className="volunteer-experience-map-wrapper">
                        {this.state.volunteerOpportunity.latitude && (
                            <VolunteerExperienceDetailsMap
                                className="volunteer-experience-map"
                                id={this.props.match.params.id}
                                volunteerOpportunity={this.state.volunteerOpportunity}
                            />
                        )}

                    </div>
                    <div className="volunteer-experience-details">
                        <button className="experience-delete-button" onClick={this.deleteExperience}><Link className="back-link" to="/volunteer">Delete</Link></button>
                        <button className="back-button"><Link className="back-link" to="/volunteer">Go Backto your page</Link></button>
                        <h2 className="volunteer-experience-title">{title}</h2>
                        <h3 className="volunteer-experience-organization">{organization}</h3>
                        <p className="volunteer-experience-organization-website"><a className="volunteer-experience-organization-website-link" href={organizationURL} target="/blank">{organizationURL}</a></p>
                        <p className="volunteer-experience-description-title">Description:</p>
                        <p className="volunteer-experience-description-text">{description}</p>
                        <p className="volunteer-experience-address-title">Address:</p>
                        <p className="volunteer-experience-address-text">{address}</p>
                        <p className="volunteer-experience-duration-title">Duration:</p>
                        <p className="volunteer-experience-duration-text">{duration}</p>
                        {rating && (
                            <div>
                                <p className="volunteer-experience-rating-title">Your rating:</p>
                                <p className="volunteer-experience-rating-stars">{this.calculateStarRating()}</p>
                                <p className="volunteer-experience-comment-title">Your comment:</p>
                            </div>
                        )}
                        {rating && comment && (
                            <p className="volunteer-experience-comment-text">{comment}</p>
                        )}
                        {rating && !comment && (
                            <div>
                                <p className="no-comment" >You haven't added a comment yet</p>
                                <form className="volunteer-experience-comment-form">
                                    <label className="comment-label">Leave a comment:</label><br />
                                    <textarea className="comment-text" name="comment" placeholder="Comment" value={this.comment} onChange={this.handleComment}></textarea><br />
                                    <button className="comment-submit-button" onClick={this.submitComment}>Submit</button>
                                </form>
                            </div>
                        )}
                        {!rating && (
                            <div>
                                <button className="experience-completed-button" onClick={this.handleClick}>Completed</button>
                                {this.state.isButtonClicked &&
                                    <form className="volunteer-experience-rating-form">
                                        <label className="rating-label">Rate your experience (out of 5)</label><br />
                                        <input className="rating-input" type="text" name="rating" placeholder="Rating" value={this.rating} onChange={this.handleRating} /><br />
                                        <p className="no-message">{this.state.noRatingMessage}</p>
                                        <label className="comment-label">Leave a comment:</label><br />
                                        <textarea className="comment-text" name="comment" placeholder="Comment" value={this.comment} onChange={this.handleComment}></textarea><br />
                                        <button className="rating-submit-button" onClick={this.submitRating}>Submit</button>
                                        <button className="rating-cancel-button" onClick={this.handleCancel}>Cancel</button>
                                    </form>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default VolunteerExperienceDetails;