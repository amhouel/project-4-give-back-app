import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import "./style.css";

class SearchNav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zipcode: "",
            latitude: null,
            longitude: null
        }
    }

    componentDidMount = async() => {
        this.nearYouSearch();
    }

    handleZipcodeClick = async event => {
        event.preventDefault();
        this.props.history.push(`/opportunities/${this.state.zipcode}`)
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            zipcode: event.target.value
        });
    }

    handleNearyouClick = async event => {
        event.preventDefault();
        this.nearYouSearch();
    }

    nearYouSearch = async() => {
        const url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAYweaxEaQXTdEVV-L-JCoBC_7DFCZL404';
        const response = await fetch (url, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const geolocation = await response.json();
        this.setState({
            longitude: geolocation.location.lng,
            latitude: geolocation.location.lat
        }); 
    }

    render() {
        if (!localStorage.getItem('user-jwt')) {
            return null;
        }
        return (
            <nav>
                <form className="search-form">
                    <div className="search-zipcode-wrapper">
                        <label className="search-zipcode-label">Search volunteering opportunities by zipcode: </label>
                        <div className="search-zipcode">
                            <input className="search-zipcode-input" type="text" placeholder="Enter Zipcode" value={this.state.zipcode} onChange={this.handleChange} />
                            <button className="zipcode-button" onClick={this.handleZipcodeClick}><Link className="zipcode-button-link" to={`/opportunities/${this.state.zipcode}`}>Go</Link></button><br />
                        </div>
                    </div>
                    <div className="search-nearyou-wrapper">
                        <label className="search-nearyou-label">Or near you: </label>
                        <button className="nearyou-button" onClick={this.handleNearyouClick}><Link className="nearyou-link" to={`/opportunities/near-you/${this.state.longitude}/${this.state.latitude}`}>Go</Link></button>
                    </div>
                </form>
                <button className="logout-button" onClick={this.props.logOut} ><Link className="logout-link" to='/' >Log Out</Link></button>
            </nav>
        )
    }
}

export default withRouter(SearchNav);
