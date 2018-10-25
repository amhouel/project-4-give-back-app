import React, { Component } from 'react';
import './style.css';
import VolunteeringOpportunity from '../VolunteeringOpportunity';
import VolunteeringOpportunitiesMap from '../VolunteeringOpportunitiesMap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

class VolunteeringOpportunityList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            volunteeringOpportunities: [],
            // displayTitle: 'none',
        }
    }

    componentDidMount = async () => {
        this.fetchVolunteeringOpportunities();
    }

    fetchVolunteeringOpportunities = async () => {
        let url = '/api/opportunities';
        let zipcode = this.props.match.params.zipcode;
        if (zipcode) {
            url += `?zipcode=${zipcode}`;
        }
        const volunteeringOpportunities = await (await fetch(url)).json();
        this.setState({
            volunteeringOpportunities: volunteeringOpportunities
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.zipcode !== prevProps.match.params.zipcode) {
            this.fetchVolunteeringOpportunities();
        }
    }

    // changeDisplayTitle = id => {
    //     this.setState({
    //         displayTitle: 'block'
    //     });
    // }

    render() {
        return (
            <div className="volunteering-opportunities-wrapper">
                {this.state.volunteeringOpportunities.length > 0 && (
                    <div className="volunteering-opportunities-map-wrapper">
                        <VolunteeringOpportunitiesMap volunteeringOpportunities={this.state.volunteeringOpportunities}/>
                    </div>
                )}
                <div className="volunteering-opportunities">
                <button className="back-volunteer-button"><Link className="back-volunteer-link" to="/volunteer">Go Back To Your page</Link></button>
                    <h2 className="volunteering-opportunities-title">Your search results</h2>
                    <h3 className="volunteering-opportunities-subtitle">Volunteering opportunities in zipcode {this.props.match.params.zipcode}:</h3>
                    {this.state.volunteeringOpportunities.length === 0 && (
                        <p className="no-message">Sorry, there are no volunteering opportunities in this area at the moment!</p>
                    )}

                    <div className="volunteering-opportunities-list">
                        {this.state.volunteeringOpportunities.length > 0 && this.state.volunteeringOpportunities.map(volunteeringOpportunity => {
                            let count = 0;
                            return (
                                <VolunteeringOpportunity
                                    key={volunteeringOpportunity.id - `${count += 1}`}
                                    id={volunteeringOpportunity.id}
                                    title={volunteeringOpportunity.title}
                                    organization={volunteeringOpportunity.organization}
                                    zipcode={this.props.match.params.zipcode}
                                    // changeDisplayTitle={() => this.changeDisplayTitle(volunteeringOpportunity.id)}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default VolunteeringOpportunityList;