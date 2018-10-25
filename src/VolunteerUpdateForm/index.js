import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import SearchNav from '../SearchNav';
import './style.css';

class VolunteerUpdateForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      valid: false,
      fullName: '',
      dob: '',
      address: '',
      profilePicture: '',
      email: '',
      password: '',
      emailMessage: '',
      passwordMessage: ''
    }
  }

  componentDidMount = async () => {
    this.fetchUser();
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

  updateInput = event => {
    event.preventDefault();
    if([event.target.name]){
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  // Code from "React Image Upload Made Easy" Youtube video
  updateFile = event => {
    event.preventDefault();
    this.setState({
      profilePicture: event.target.files[0]
    });
  }

  isValid = event => {
    event.preventDefault();

    let isValid = false;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let specialCharacterPattern = /[!@()#$%&'*+/=?^_`{|}~-]+/;
    let numberPattern = /\d/;
    let emailMessageText;
    let passwordMessageText;

    if (this.state.email && !emailRegex.exec(this.state.email)) {
      isValid = false;
      emailMessageText = 'Email address is invalid!';
    }
    else if (this.state.password && (this.state.password.length < 7 || !specialCharacterPattern.exec(this.state.password) || !numberPattern.exec(this.state.password))) {
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
    fd.append('public_id', `${this.state.profilePicture.name}-${this.state.user.username}`);
    xhr.send(fd);
  }

  update = async(event) => {
    event.preventDefault();
    const body = JSON.stringify({
      fullName: this.state.fullName,
      dob: this.state.dob,
      address: this.state.address,
      profilePicture: `${this.state.profilePicture.name}-${this.state.user.username}`,
      email: this.state.email,
      password: this.state.password
    });
    await fetch('/api/volunteer', {
      method:"PUT",
      body: body,
      headers: {
        'jwt-token': localStorage.getItem('user-jwt'),
        'Content-Type': 'application/json'
      }
    });
    this.fetchUser();
  }

  render() {
    const { fullName, address, email, profilePicture } = this.state.user;
    return (
      <div>
        <h2 className="volunteer-update-title">Update you profile {this.state.user.fullName}</h2>
        <div className="update-wrapper">
          <form className="update-form" onSubmit={this.isValid}>
            <label className="full-name-label">Full Name:</label>
            <input className="full-name-input" type="text" placeholder={fullName} name="fullName" value={this.state.fullName} onChange={this.updateInput} />
            <label className="dob-label">Date of Birth:</label>
            <input type="date" name="dob" value={this.state.dob} onChange={this.updateInput} />
            <label className="address-label">Address:</label>
            <input className="address-input" type="text" name="address" placeholder={address} value={this.state.address} onChange={this.updateInput} />
            <label className="email-label">Email:</label>
            <input type="email" name="email" placeholder={email} value={this.state.email} onChange={this.updateInput} />
            <p className="validation-message">{this.state.emailMessage}</p>
            <label className="profile-picture-label">Profile Picture:</label>
            <input type="file" name="profilePicture" placeholder={profilePicture} onChange={this.updateFile} />
            <label className="password-label">Password:</label>
            <input type="password" name="password" placeholder="New Password" value={this.state.password} onChange={this.updateInput} />
            <p className="validation-message">{this.state.passwordMessage}</p>
          </form>
          {!this.state.valid && (
            <div>
              <button className="ok-button" onClick={this.isValid}>Ok</button>
              <button className="cancel-update-button"><Link className="cancel-link" to='/volunteer'>Cancel</Link></button>
            </div>
          )}
          {this.state.valid && (
            <button className="update-button" onClick={this.update}><Link className="update-link" to='/volunteer'>Update Profile</Link></button>
          )}
        </div>
      </div>
    )
  }
}

export default VolunteerUpdateForm;