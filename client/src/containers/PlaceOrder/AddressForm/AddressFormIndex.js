import React, { Component } from 'react';
import {Link} from "react-router-dom";
import NormalInput from '../../../components/UI/NormalInput';

const AddressForm = props =>  {

    const {address} = props;

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3"><i className="fas fa-user-plus"/>USER ADDRESS</h1>
                    <form onSubmit={props.addressSubmitHandler}>
                        <div className="Row">
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="fullName"
                                    value={address.fullName}
                                    placeholder={'Full Name'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="mobileNumber"
                                    value={address.mobileNumber}
                                    placeholder={'10-digit Mobile Number'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="Row">
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="pinCode"
                                    value={address.pinCode}
                                    placeholder={'Pincode'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="locality"
                                    value={address.locality}
                                    placeholder={'Locality'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="Row">
                            <NormalInput
                                name="address"
                                value={address.address}
                                placeholder={'Address (Area and Street)'}
                                inputHandler={props.inputHandler}
                                type="textarea"
                                style={{height: '60px'}}
                            />
                        </div>

                        <div className="Row">
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="cityDistrictTown"
                                    value={address.cityTownDistrict}
                                    placeholder={'City/District/Town'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="state"
                                    value={address.state}
                                    placeholder={'State'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="Row">
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="landmark"
                                    value={address.landmark}
                                    placeholder={'Landmark (Optional)'}
                                    inputHandler={props.inputHandler}
                                    type="text"
                                />
                            </div>
                            <div style={{width: '49%'}}>
                                <NormalInput
                                    name="alternatePhoneNumber"
                                    value={address.alternateNumber}
                                    placeholder={'Alternate Phone (Optional)'}
                                    inputHandler={props.inputHandler}
                                    type="text"

                                />
                            </div>
                        </div>

                        <div className="Row">
                            <button className="DeliveryAddressButton">SAVE AND DELIVER</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );


}

export default AddressForm;