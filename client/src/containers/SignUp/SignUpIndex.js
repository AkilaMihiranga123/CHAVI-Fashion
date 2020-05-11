import React, { Component } from 'react';
import * as authActions from '../../actions/authActions';

import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            first_Name: '',
            last_Name: '',
            email: '',
            gender: '',
            contact_Name: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    signupHandler = (e) => {
        e.preventDefault();

        const user = {
            first_Name: this.state.first_Name,
            last_Name: this.state.last_Name,
            email: this.state.email,
            gender: this.state.gender,
            contact_Number: this.state.contact_Number,
            password: this.state.password
        }

        this.props.signup(user)
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.props.history.push({
                    pathname: '/login',
                    search: '?signup=success',
                    state: jsonResponse.message
                });
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

        const { redirectToReferrer }  = this.state;

        if(redirectToReferrer){
            return <Redirect to="/" />
        }

        return (
            <div className="row mt-5">
                <div className="col-md-4 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"><i className="fas fa-user-plus"/> REGISTER</h1>

                        <form onSubmit={this.signupHandler} autoComplete="off">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="first_Name"
                                    value={this.state.first_Name}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="last_Name"
                                    value={this.state.last_Name}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                />
                            </div>
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
                                    type="text"
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Gender"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="contact_Number"
                                    value={this.contact_Number}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Contact Number"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Create Password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Register</button><br/>
                            <a href="/" className="btn btn-danger btn-block">Cancel</a>
                        </form>
                        <p className="lead mt-4">Have An Account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (user) => dispatch(authActions.signup(user)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);