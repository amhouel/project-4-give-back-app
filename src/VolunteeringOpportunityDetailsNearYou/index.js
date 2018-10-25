import React, { Component } from 'react';
import VolunteeringOpportunityMap from '../VoluneeringOpportunityMap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import VolunteeringOpportunityRatings from '../VolunteeringOpportunityRatings';

class VolunteeringOpportunityDetailsNearYou extends Component {

    constructor(props) {
        super(props)

        this.state = {
            volunteeringOpportunity: {},
            addButtonClicked: false,
            volunteerExperiences: []
        }
    }

    componentDidMount = async () => {
        this.fetchVolunteeringOpportunity();
        this.fetchVolunteerExperiences();
    }

    fetchVolunteeringOpportunity = async () => {
        const id = this.props.match.params.id;
        const volunteeringOpportunity = await (await fetch(`/api/opportunities/${id}`)).json();
        this.setState({
            volunteeringOpportunity: volunteeringOpportunity
        });
    }

    addOpportunity = async () => {
        const id = this.props.match.params.id;
        const newExperience = await fetch('/api/volunteer/opportunities', {
            method: "POST",
            body: JSON.stringify({
                opportunityId: id
            }),
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
        this.setState({
            addButtonClicked: true
        });
    }

    fetchVolunteerExperiences = async () => {
        const id = this.props.match.params.id;
        const volunteerExperiences = await (await fetch(`/api/experiences/${id}`)).json();
        this.setState({
            volunteerExperiences: volunteerExperiences
        });
    }

    fetchUsername = async (rating, comment) => {
        const id = this.props.match.params.id;
        const username = await (await fetch(`/api/experiences/${id}/volunteer?rating=${rating}&comment=${comment}`)).json();
        this.setState({
            username: username
        }, () => {
            return this.state.username;
        })
    }

    calculateStarRating = (volunteerExperience) => {
        let starRating = '';
        for (let i = 0; i < volunteerExperience.rating; i++) {
            starRating += '⭐️'
        }
        return starRating;
    }

    render() {
        const { title, organization, organizationURL, description, address, duration } = this.state.volunteeringOpportunity;
        return (
            <div >
                <div className="volunteering-opportunity-details-nearyou-wrapper">
                    <div className="volunteering-opportunity-nearyou-map-wrapper">
                        {this.state.volunteeringOpportunity.latitude && (
                            <VolunteeringOpportunityMap
                                className="volunteering-opportunity-map"
                                id={this.props.match.params.id}
                                volunteeringOpportunity={this.state.volunteeringOpportunity}
                            />
                        )}

                    </div>
                    <div className="volunteering-opportunity-details-nearyou">
                        <button className="nearyou-volunteer-button"><Link className="nearyou-volunteer-link" to="/volunteer">Go Back To Your page</Link></button>
                        <button className="nearyou-back-list-button"><Link className="nearyou-back-link" to={`/opportunities/near-you/${this.props.match.params.lng}/${this.props.match.params.lat}`}>Go Back to result list</Link></button>
                        <h2 className="volunteering-opportunity-details-nearyou-title">{title}</h2>
                        <h3 className="volunteering-opportunity-details-nearyou-organization">{organization}</h3>
                        <p className="volunteering-opportunity-details-nearyou-organization-website"><a className="volunteering-opportunity-details-nearyou-organization-website-link" href={organizationURL} target="/blank">{organizationURL}</a></p>
                        <p className="volunteering-opportunity-details-nearyou-description-title">Description:</p>
                        <p className="volunteering-opportunity-details-nearyou-description-text">{description}</p>
                        <p className="volunteering-opportunity-details-nearyou-address-title">Address:</p>
                        <p className="volunteering-opportunity-details-nearyou-address-text">{address}</p>
                        <p className="volunteering-opportunity-details-nearyou-duration-title">Duration:</p>
                        <p className="volunteering-opportunity-details-nearyou-duration-text">{duration}</p>
                        {!this.state.addButtonClicked &&
                            <button className="opportunity-nearyou-add-button" onClick={this.addOpportunity}>Add Opportunity</button>
                        }
                        {this.state.addButtonClicked &&
                            <span className="opportunity-nearyou-added" role="img" aria-label="opportunity added">💚</span>
                        }
                    </div>
                    <div className="volunteering-opportunity-nearyou-feedback-wrapper">
                        <h3 className="volunteering-opportunity-nearyou-feedback-title">See other volunteers' ratings</h3>
                        {this.state.volunteerExperiences.map(volunteerExperience => {
                            const date = volunteerExperience.updatedAt;
                            const modifiedDate = date.split('T').splice(0, 1);
                            return (
                                <VolunteeringOpportunityRatings
                                    key={volunteerExperience.id}
                                    id={volunteerExperience.id}
                                    username={() => this.fetchUsername(volunteerExperience.rating, volunteerExperience.comment)}
                                    date={modifiedDate}
                                    comment={volunteerExperience.comment}
                                    starRating={this.calculateStarRating(volunteerExperience)}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default VolunteeringOpportunityDetailsNearYou;