import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';

export default class UpdatePassword extends Component {

    constructor(props) {
        super(props);

        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            password: '',
            newPassword: ''
        }
    }

    onChangeCurrentPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const updatePassword = {
            password: this.state.password,
            newPassword: this.state.newPassword
        }

        axios.post('http://localhost:5000/user/update-password/'+this.props.match.params.id, updatePassword)
            .then(res => {
                console.log(res.data);
            })
            .catch(() => {
                console.log('Error');
            });

    }

    render() {
        return (
            <div>
                <Header/>
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">UPDATE PASSWORD</h1>

                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeCurrentPassword}
                                        className="form-control"
                                        placeholder="Enter Current Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={this.onChangeNewPassword}
                                        className="form-control"
                                        placeholder="Enter New Password"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Update Password</button><br/>
                                <a href="/" className="btn btn-danger btn-block">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}
