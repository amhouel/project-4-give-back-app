import React, { Component } from 'react';
import './style.css';
import VolunteerExperienceList from '../VolunteerExperienceList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import VolunteerUpdateForm from '../VolunteerUpdateForm';

class Volunteer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            isButtonClicked: false
        }
    }

    componentDidMount = async () => {
        this.fetchUser();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.state.user !== prevState.user || this.state.isButtonClicked !== prevState.isButtonClicked) {
            this.fetchUser();
        }
    }

    fetchUser = async () => {
        const user = await (await fetch('/api/volunteer', {
            method: "GET",
            headers: {
                "jwt-token": localStorage.getItem('user-jwt')
            }
        })).json();
        this.setState({
            user: user
        });
    }

    handleDeleteClick = () => {
        this.setState({
            isButtonClicked: true
        });
    }

    cancelDelete = () => {
        this.setState({
            isButtonClicked: false
        });
    }

    deleteProfile = async() => {
        await fetch('/api/volunteer', {
            method:"DELETE",
            headers:{
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
        this.setState({
            isButtonClicked: false
        });
        localStorage.clear();
    }

    render() {
        const publicId = this.state.user.profilePicture ? this.state.user.profilePicture : 'portrait-placeholder';
        if (!publicId) {
            return null;
        }
        return (
            <div>
                <div className="volunteer-wrapper">
                    <aside className="volunteer-info-wrapper">
                        <h2 className="volunteer-welcome">Welcome {this.state.user.fullName}!</h2>
                        <h3 className="volunteer-score">Your current score is {this.state.user.score}</h3>
                        <div className="volunteer-picture-wrapper">
                            <Image className="volunteer-picture" cloudName="amhouel" publicId={publicId} width="150" height="150" gravity="center" crop="fill" />
                        </div>
                        <p className="volunteer-info">{this.state.user.username}</p>
                        <p className="volunteer-info">{this.state.user.address}</p>
                        <p className="volunteer-info">{this.state.user.email}</p>
                        <button className="volunteer-update-button"><Link className="volunteer-update-link" to='/volunteer/update'>Update Your Profile</Link></button>
                        <Route path='/volunteer/update' exact component={VolunteerUpdateForm} />
                        {!this.state.isButtonClicked &&
                            <button className="volunteer-delete-button" onClick={this.handleDeleteClick}>Delete Your Profile</button>
                        }
                        {this.state.isButtonClicked &&
                            <div className="volunteer-delete-confirmation-wrapper">
                                <p className="volunteer-delete-confirmation">Do you really wish to delete your profile?</p>
                                <button className="volunteer-delete-yes-button" onClick={this.deleteProfile}><Link className="volunteer-delete-yes-link" to='/'>Yes</Link></button>
                                <button className="volunteer-delete-no-button" onClick={this.cancelDelete}><Link className="volunteer-delete-no-link" to='/volunteer'>No</Link></button>
                            </div>
                        }

                    </aside>
                    <VolunteerExperienceList />
                </div>
            </div>
        )
    }
}

export default Volunteer;
