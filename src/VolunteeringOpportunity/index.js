import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VolunteeringOpportunityDetails from '../VolunteeringOpportunityDetails';
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
            <div className="volunteering-opportunity-wrapper">
                <Link className="volunteering-opportunity-link" to={`/opportunities/${this.props.zipcode}/${this.props.id}`}>
                    <p className="volunteering-opportunity-title">{this.props.title}</p>
                    <p className="volunteering-opportunity-organization">{this.props.organization}</p>
                </Link>
                <Route path={`/opportunities/${this.props.zipcode}/${this.props.id}`} exact component={VolunteeringOpportunityDetails} />
                {!this.state.addButtonClicked &&
                    <button className="add-button" onClick={this.addOpportunity}>Add volunteering opportunity</button>
                }
                {this.state.addButtonClicked &&
                    <span className="opportunity-added" role="img" aria-label="opportunity added">💚</span>
                }
            </div>
        )
    }
}

export default VolunteeringOpportunity;