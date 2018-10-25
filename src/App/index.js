import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./style.css";
import Login from '../Login';
import Register from '../Register';
import Volunteer from '../Volunteer';
import VolunteerUpdateForm from '../VolunteerUpdateForm';
import PrivateRoute from '../PrivateRoute';
import VolunteerExperienceDetails from "../VolunteerExperienceDetails";
import VolunteeringOpportunityList from '../VolunteeringOpportunityList';
import VolunteeringOpportunityDetails from '../VolunteeringOpportunityDetails';
import VolunteeringOpportunityListNearYou from '../VolunteeringOpportunityListNearYou';
import VolunteeringOpportunityDetailsNearYou from '../VolunteeringOpportunityDetailsNearYou';
import SearchNav from '../SearchNav';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: false || localStorage.getItem('user-jwt')
    }
  }

  logOut = () => {
    localStorage.clear();
    this.setState({
      token: false
    })
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <header>
            <h1 className="header-title">Give Back NYC</h1>
            <h2 className="header-subtitle">to your community</h2>
          </header>
          <SearchNav logOut={this.logOut} />
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/volunteer" exact component={Volunteer} />
          <PrivateRoute path="/volunteer/update" exact component={VolunteerUpdateForm} />
          <PrivateRoute path="/volunteer/experiences/:id" exact component={VolunteerExperienceDetails} />
          <PrivateRoute path="/opportunities/:zipcode" exact component={VolunteeringOpportunityList} />
          <PrivateRoute path="/opportunities/:zipcode/:id" exact component={VolunteeringOpportunityDetails} />
          <PrivateRoute path='/opportunities/near-you/:lng/:lat' exact component={VolunteeringOpportunityListNearYou} />
          <PrivateRoute path='/opportunities/near-you/:lng/:lat/:id' exact component={VolunteeringOpportunityDetailsNearYou} />
        </div>
      </Router>
    )
  }
}

export default App;
