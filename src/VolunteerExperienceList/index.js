import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import VolunteerComingExperience from '../VolunteerComingExperience';
import VolunteerPastExperience from '../VolunteerPastExperience';
import './style.css';

class VolunteerExperienceList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: localStorage.getItem('user-jwt'),
            user: {},
            comingExperiences: [],
            pastExperiences: [],
            pastExperienceRating: undefined,
            pastExperienceComment: ''
        }
    }

    componentDidMount = async () => {
        this.fetchUser();
        this.fetchVolunteerComingExperiences();
        this.fetchVolunteerPastExperiences();
    }

    fetchVolunteerComingExperiences = async () => {
        const comingExperiences = await (await fetch('/api/volunteer/experiences/coming', {
            headers: {
                'jwt-token': this.state.token
            }
        })).json();
        this.setState({
            comingExperiences: comingExperiences
        });
    }

    fetchVolunteerPastExperiences = async () => {
        const pastExperiences = await (await fetch('/api/volunteer/experiences/past', {
            headers: {
                'jwt-token': this.state.token
            }
        })).json();
        this.setState({
            pastExperiences: pastExperiences
        });
    }

    fetchUser = async () => {
        const user = await (await fetch('/api/volunteer', {
            method: "GET",
            headers: {
                "jwt-token": this.state.token
            }
        })).json();
        this.setState({
            user: user
        });
    }

    deleteExperience = async id => {
        const deletedExperience = await fetch('/api/volunteer/experiences', {
            method: "DELETE",
            body: JSON.stringify({ experienceId: id }),
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': this.state.token
            }
        });
        this.fetchVolunteerComingExperiences();
        this.fetchVolunteerPastExperiences();
    }

    updateRating = (rating) => {
        this.setState({
            pastExperienceRating: rating,
        });
    }

    updateComment = (comment) => {
        this.setState({
            pastExperienceComment: comment,
        });
    }

    completedExperience = async id => {
        const body = JSON.stringify({
            experienceId: id,
            rating: this.state.pastExperienceRating,
            comment: this.state.pastExperienceComment
        });

        await fetch('/api/volunteer/experiences', {
            method: "POST",
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': this.state.token
            }
        });
        this.fetchVolunteerComingExperiences();
        this.fetchVolunteerPastExperiences();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user.score !== prevState.user.score) {
            this.fetchUser();
        }
    }

    render() {

        return (
            <div className="volunteer-experiences">
                <h2 className="volunteer-experiences-title">Your Volunteering Experiences</h2>
                <h3 className="volunteer-experiences-subtitle">Coming experiences:</h3>
                {this.state.comingExperiences.length === 0 && (
                    <p className="no-message">No coming experiences recorded!</p>
                )}
                <ul className="volunteer-coming-experiences-list">
                    {this.state.comingExperiences.length > 0 && this.state.comingExperiences.map(comingExperience => {
                        let count = 0;
                        return (
                            <div>
                                <VolunteerComingExperience
                                    key={comingExperience.id - `${count += 1}`}
                                    id={comingExperience.id}
                                    title={comingExperience.title}
                                    rating={this.state.pastExperienceRating}
                                    comment={this.state.pastExperienceComment}
                                    updateRating={this.updateRating}
                                    updateComment={this.updateComment}
                                    deleteExperience={() => this.deleteExperience(comingExperience.id)}
                                    completedExperience={() => this.completedExperience(comingExperience.id)}
                                />
                            </div>
                        )
                    })}
                </ul>
                <h3 className="volunteer-experiences-subtitle">Past experiences:</h3>
                {this.state.pastExperiences.length === 0 && (
                    <p className="no-message">No past experiences recorded!</p>
                )}
                <ul className="volunteer-past-experiences-list">
                    {this.state.pastExperiences.length > 0 && this.state.pastExperiences.map(pastExperience => {
                        let count = 0;
                        return (
                            <div>
                                <VolunteerPastExperience
                                    key={pastExperience.id - `${count += 1}`}
                                    id={pastExperience.id}
                                    title={pastExperience.title}
                                    deleteExperience={() => this.deleteExperience(pastExperience.id)}
                                />
                            </div>
                        )
                    })}
                </ul>

            </div>
        )
    }
}

export default VolunteerExperienceList;
