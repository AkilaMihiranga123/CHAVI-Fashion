import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            first_Name : '',
            last_Name : '',
            email : '',
            gender : '',
            contact_Number : '',
            data: {}
        }
    }

    componentDidMount() {
        console.log(this.props.auth.user);
        this.data = this.props.auth.user
        this.setState({
            first_Name : this.data.first_Name,
            last_Name : this.data.last_Name,
            email : this.data.email,
            gender: this.data.gender,
            contact_Number: this.data.contact_Number
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="col-md-10 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center"><b>USER PROFILE</b></h1>
                        <div className="row mt-1">
                            <div className="col-md-10 m-auto">
                                <div className="card border-primary card-body">
                                    <div className="text-center">
                                        <h5><i className="far fa-user-circle fa-6x"></i></h5>
                                        <h3><b>{this.state.first_Name}   {this.state.last_Name}</b></h3>
                                        <h1><a className="btn btn-primary" href="/edit-profile"><i className="fas fa-user-edit"></i> EDIT PROFILE DETAILS</a></h1>
                                    </div>
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td>{this.state.first_Name}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Name</td>
                                                <td>{this.state.last_Name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{this.state.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>{this.state.gender}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{this.state.contact_Number}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Profile);