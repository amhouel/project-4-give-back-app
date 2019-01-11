import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import cloudinary from 'cloudinary-react';
import { Redirect } from 'react-router-dom';
import './style.css';


class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToReferrer: false,
            valid: false,
            fullName: '',
            dob: '',
            address: '',
            username: '',
            profilePicture: '',
            email: '',
            password: '',
            usernameMessage: '',
            emailMessage: '',
            passwordMessage: '',
            message: ''
        }
    }

    updateInput = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Code from "React Image Upload Made Easy" Youtube video
    updateFile = event => {
        event.preventDefault();
        this.setState ({
            profilePicture: event.target.files[0]
        });
    }

    isValid = event => {
        event.preventDefault();
        let isValid = false;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let specialCharacterPattern = /[!@()#$%&'*+/=?^_`{|}~-]+/;
        let numberPattern = /\d/;
        let usernameMessageText;
        let emailMessageText;
        let passwordMessageText;

        if (this.state.username.length === 0) {
        isValid = false;
        usernameMessageText = 'A username is required for registration';
        }
        else if (!emailRegex.exec(this.state.email)) {
        isValid = false;
        emailMessageText = 'Email address is invalid!';
        }
        else if (this.state.password.length < 7 || !specialCharacterPattern.exec(this.state.password) || !numberPattern.exec(this.state.password)) {
        isValid = false;
        passwordMessageText = 'Password is invalid! Password must be at least 7 characters long and include at least one number and one special character';
        } else {
            isValid = true;
            if(this.state.profilePicture){
                this.uploadFile();
            }
        }
 
        this.setState({
        valid: isValid,
        usernameMessage: usernameMessageText,
        emailMessage: emailMessageText,
        passwordMessage: passwordMessageText
        });
    }
    
    //Code from "HTML5 upload (xhr) to Cloudinary" Codepen
    uploadFile = async() => {
        const url = 'https://api.cloudinary.com/v1_1/amhouel/upload';
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        await xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        fd.append('upload_preset', 'zm0ff4bo');
        fd.append('file', this.state.profilePicture);
        fd.append('public_id', `${this.state.profilePicture.name}-${this.state.username}`);
        xhr.send(fd);
    }

    register = async(event) => {
        event.preventDefault();
        const body = JSON.stringify({
            fullName: this.state.fullName,
            dob: this.state.dob? this.state.dob : null,
            address: this.state.address,
            username: this.state.username,
            profilePicture:  this.state.profilePicture? `${this.state.profilePicture.name}-${this.state.username}`: null,
            email: this.state.email,
            password: this.state.password,
        });
        const response = await fetch('/api/register', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseBody = await response.json();
        if(response.status === 409){
            this.setState({
                message: responseBody.message
            });
            return;
        }
        localStorage.setItem('user-jwt', responseBody.token);
        this.setState({
            redirectToReferrer: true
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/volunteer" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        } else {
            return (
                <div className="register-wrapper">
                    <form className="register-form" onSubmit={this.isValid}>
                        <label className="full-name-label">Full Name:</label>
                        <input className="full-name-input" type="text" placeholder="Full name" name="fullName" value={this.state.fullName} onChange={this.updateInput}/>
                        
                        <label className="dob-label">Date of Birth:</label>
                        <input type="date" name="dob" value={this.state.dob} onChange={this.updateInput}/>
                        
                        <label className="address-label">Address:</label>
                        <input className="address-input" type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.updateInput}/>
                        
                        <label className="email-label">Email:</label>
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.updateInput}/>
                        <p className="validation-message">{this.state.emailMessage}</p>
                        
                        <label className="profile-picture-label">Profile Picture:</label>
                        <input type="file" name="profilePicture" onChange={this.updateFile}/>
                        
                        <label className="username-label">Username:</label>
                        <input className="username-input" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.updateInput}/>
                        <p className="validation-message">{this.state.usernameMessage}</p>
                        
                        <label className="password-label">Password:</label>
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.updateInput}/>
                        <p className="validation-message">{this.state.passwordMessage}</p>
                    </form>
                        {!this.state.valid && (
                            <div>
                                <button className="ok-button" onClick={this.isValid}>Ok</button>
                                <button className="cancel-register-button"><Link className="cancel-link" to='/'>Cancel</Link></button>
                            </div>
                        )}
                        {this.state.valid && (
                            <button className="register-button" onClick={this.register}>Register</button>
                        )}
                        {this.state.message && (
                            <p className="validation-message">{this.state.message}</p>
                        )}
                </div>
            )
        }
    }
}

export default Register;