import React, { Component } from 'react';
import VolunteeringOpportunitiesMap from '../VolunteeringOpportunitiesMap';
import VolunteeringOpportunityNearYou from '../VolunteeringOpportunityNearYou';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';

class VolunteeringOpportunityListNearYou extends Component {
    constructor(props) {
        super(props)

        this.state = {
            volunteeringOpportunities: [],
        }
    }

    componentDidMount = async () => {
        this.fetchVolunteeringOpportunitiesNearYou();
    }

    fetchVolunteeringOpportunitiesNearYou = async () => {
        let url = '/api/opportunities';
        let lng = this.props.match.params.lng;
        let lat = this.props.match.params.lat;
        if (lng && lat) {
            url += `?lng=${lng}&lat=${lat}`;
        }
        const volunteeringOpportunities = await (await fetch(url)).json();
        this.setState({
            volunteeringOpportunities: volunteeringOpportunities
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.lng !== prevProps.match.params.lng || this.props.match.params.lat !== prevProps.match.params.lat) {
            this.fetchVolunteeringOpportunitiesNearYou();
        }
    }

    render() {
        return (
            <div className="volunteering-opportunities-nearyou-wrapper">
                {this.state.volunteeringOpportunities.length > 0 && (
                    <div className="volunteering-opportunities-nearyou-map-wrapper">
                        <VolunteeringOpportunitiesMap volunteeringOpportunities={this.state.volunteeringOpportunities} />
                    </div>
                )}
                <div className="volunteering-opportunities-nearyou">
                    <button className="nearyou-back-volunteer-button"><Link className="nearyou-back-volunteer-link" to="/volunteer">Go Back To Your page</Link></button>
                    <h2 className="volunteering-opportunities-nearyou-title">Your search results</h2>
                    <h3 className="volunteering-opportunities-nearyou-subtitle">Volunteering opportunities near you:</h3>
                    {this.state.volunteeringOpportunities.length === 0 && (
                        <p className="no-message">Sorry, there are no volunteering opportunities near you at the moment!</p>
                    )}

                    <div className="volunteering-opportunities-nearyou-list">
                        {this.state.volunteeringOpportunities.length > 0 && this.state.volunteeringOpportunities.map(volunteeringOpportunity => {
                            let count = 0;
                            return (
                                <VolunteeringOpportunityNearYou
                                    key={volunteeringOpportunity.id - `${count += 1}`}
                                    id={volunteeringOpportunity.id}
                                    title={volunteeringOpportunity.title}
                                    organization={volunteeringOpportunity.organization}
                                    lat={this.props.match.params.lat}
                                    lng={this.props.match.params.lng}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default VolunteeringOpportunityListNearYou;