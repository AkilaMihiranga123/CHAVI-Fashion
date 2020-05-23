import React from 'react';
import './style.css';
import RadioButton from '../../../components/UI/RadioButton';

const DeliveryAddress = props => {

    const {address} = props;

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto">
                <div className="card card-body">
                    <div className="AddressSelection" key={address._id}>
                        <RadioButton
                            name="address"
                            label=""
                            value={address._id}
                            onChange={props.onAddressSelection}
                        />
                        <div>
                            <p className="AddressAuthor">{address.fullName} {address.mobileNumber}</p>
                            <p className="AuthorAddress">{address.address}, {address.cityDistrictTown}, {address.state} - {address.pinCode}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryAddress;