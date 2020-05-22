import React from 'react';

const DeliveryAddress = props => {

    const {address} = props;

    return (
        <div className="row mt-5">
            <div className="col-md-4 m-auto">
                <div className="card card-body" key={address._id}>
                    <input
                        type="radiobutton"
                        name="address"
                        value={address._id}
                        onChange={props.onAddressSelection}
                    />
                    <div>
                        <h2 className="text-left mb-3">{address.fullName} {address.mobileNumber}</h2>
                        <h2 className="text-left mb-3">{address.address}, {address.cityTownDistrict}, {address.state} - {address.pinCode}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryAddress;