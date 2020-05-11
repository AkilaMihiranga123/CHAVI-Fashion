import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as authActions from '../../actions/authActions';
import { connect } from 'react-redux';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    loginHandler = (e) => {
        e.preventDefault();

        this.props.authenticate(this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                if(response.hasOwnProperty('token') && response.user.userRole === 'user'){
                    window.localStorage.setItem('auth', JSON.stringify(response))
                    this.setState({
                        redirectToReferrer: true
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.setState({
                            redirectToReferrer: true
                        });
                    }
                })
                .catch(er => {
                    console.log(er);
                });
        }
    }


    render() {

        if(this.state.redirectToReferrer){
            return <Redirect to="/" />
        }
        return (
            <div className="row mt-5">
                <div className="col-md-4 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"/> LOGIN</h1>
                        <form onSubmit={this.loginHandler} autoComplete="off">
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button><br/>
                            <a href="/" className="btn btn-danger btn-block">Cancel</a>
                        </form>
                        <p className="lead mt-4">No Account? <Link to="/signup">Register</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password) => dispatch(authActions.authenticate(email, password)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);