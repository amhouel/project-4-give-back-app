import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VolunteeringOpportunityDetailsNearYou from '../VolunteeringOpportunityDetailsNearYou';
import './style.css';

class VolunteeringOpportunity extends Component {

    constructor(props) {
        super(props)

        this.state = {
            addButtonClicked: false
        }
    }


    addOpportunity = async () => {
        const id = this.props.id;
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

    render() {
        return (
            <div className="volunteering-opportunity-nearyou-wrapper">
                <Link className="volunteering-opportunity-detail-nearyou-link" to={`/opportunities/near-you/${this.props.lng}/${this.props.lat}/${this.props.id}`}>
                    <p className="volunteering-opportunity-nearyou-title">{this.props.title}</p>
                    <p className="volunteering-opportunity-nearyou-organization">{this.props.organization}</p>
                </Link>
                <Route path={`/opportunities/near-you/${this.props.lng}/${this.props.lat}/${this.props.id}`} exact component={VolunteeringOpportunityDetailsNearYou} />
                {!this.state.addButtonClicked &&
                    <button className="nearyou-add-button" onClick={this.addOpportunity}>Add volunteering opportunity</button>
                }
                {this.state.addButtonClicked &&
                    <span className="opportunity-nearyou-added" role="img" aria-label="opportunity added">💚</span>
                }
            </div>
        )
    }
}

export default VolunteeringOpportunity;