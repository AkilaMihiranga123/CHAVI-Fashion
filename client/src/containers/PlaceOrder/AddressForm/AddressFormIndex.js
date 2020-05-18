import React, { Component } from 'react';
import {Link} from "react-router-dom";

const AddressForm = props =>  {

    const {address} = props;

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3"><i className="fas fa-user-plus"/>USER ADDRESS</h1>
                    <form onSubmit={props.addressSubmitHandler} autoComplete="off">
                        <div className="form-group">
                            <input
                                type="text"
                                name="fullName"
                                value={address.fullName}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Full Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="mobileNumber"
                                value={address.mobileNumber}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Mobile Number"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="pinCode"
                                value={address.pinCode}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Pin Code"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="locality"
                                value={address.locality}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Pin Code"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="textarea"
                                name="address"
                                value={address.address}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Address"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="cityTownDistrict"
                                value={address.cityTownDistrict}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter City Town And District"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="state"
                                value={address.state}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter State"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="landmark"
                                value={address.landmark}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Landmark"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="alternatePhoneNumber"
                                value={address.alternateNumber}
                                inputHandler={props.inputHandler}
                                className="form-control"
                                placeholder="Enter Alternate Phone Number"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Save And Deliver</button><br/>
                        <a href="/" className="btn btn-danger btn-block">Cancel</a>
                    </form>
                </div>
            </div>
        </div>
    );


}

export default AddressForm;