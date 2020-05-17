import React from 'react';
import axios from 'axios';
import Header from "../../../components/Header/Header";

function ProductList() {


    
        return (
            <div>
                <Header/>
                <div className="row mt-5">
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1><a className="btn btn-info col-md-12" href="/add-product"><i className="fa fa-plus"></i> Add New Product</a></h1>
                            <br/><br/>
                            <h1 className="text-center">ProductList List</h1>
                            <div className="row mt-1">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default ProductList;