import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from '../Register';
import PrivateRoute from '../PrivateRoute';
import "./style.css";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectToReferrer: false,
            username: '',
            password: '',
            message: '',
        }
    }

    updateInput = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    login = async (event) => {
        event.preventDefault();
        const body = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });
        const response = await fetch('/api/login', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseBody = await response.json();
        if (response.status === 401 || response.status === 400) {
        this.setState({
            message: responseBody.message
        });
        return;
        }
        localStorage.setItem('user-jwt', responseBody.token);
        this.setState({
            redirectToReferrer: true,
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/volunteer" } };
        const { redirectToReferrer } = this.state;
    
        if (redirectToReferrer) {
          return <Redirect to={from} />;
        } else {
            return (
                <div className="login-wrapper">
                    <form className="login-form">
                        <label className="username-label">Username: </label><br />
                        <input className="username-input" type="text" name="username" value={this.state.username} placeholder="Enter username" onChange={this.updateInput} /><br />
                        <label className="password-label">Password: </label><br />
                        <input className="password-input" type="password" name="password" value={this.state.password} placeholder="Enter password" onChange={this.updateInput} /><br />
                        <button className="login-button" onClick={this.login}>Login</button>
                    </form>
                    {this.state.message && (
                        <p>{this.state.message}</p>
                    )}
                    <div className="register-link-wrapper">
                        <Link className="register-link" to="/register">Or Register Here</Link>
                    </div>
                </div>
            )
        }
    }
}

export default Login;
