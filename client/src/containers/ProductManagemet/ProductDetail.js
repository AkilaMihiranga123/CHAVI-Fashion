import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ProductImageGallery from "./ProductImageGallery";
import { Link } from 'react-router-dom';

function ProductDetail(props) {

    
    const productId = props.match.params.productId;
    const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/product/product_id?id=${productId}&type=single`)//get product details using product id
            .then(response => {
                setProducts(response.data[0]);
            })

    }, [])


    return (
        <div>
            <Header/>
            <div className="col-md-10 m-auto">
                <div className="card card-body"><br/><br/>
                <h1 className="text-center"> {Products.product_name} </h1>
                  <div className="card card-body"><br/><br/>
                    <div className="row">
                            <div className="col-md-5 lg">
                                <ProductImageGallery detail={Products} />
                            </div>
                            <div className="col-md-6 lg-2">
                                <div className="card card-body">
                                <div className="jumbotron bg-light">
                                     <h3>Product Name: </h3><p>{Products.product_name}</p><hr/>
                                     <h3>Product Price: </h3><p>Rs. {Products.product_price} /=</p><hr/>
                                     <h3>Product Description: </h3><p>{Products.product_description}</p><hr/>
                                     <h3>Product Category: </h3><p>{Products.category}</p><hr/>
                                    <h3>Call Us On 0778990415 For More Details.</h3><br/><br/>

                                    <div className="col-lg-12">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Link to={"/path/"+Products._id} className="btn btn-outline-info btn-lg btn-block">Add To Wish List</Link>
                                        </div><br/>
                                    </div>
                                    <div className="col-lg-12">
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Link to={"/path/"+Products._id} className="btn btn-outline-warning btn-lg btn-block">Add To Cart</Link><br/>
                                        </div><br/>
                                    </div>     
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>>    
            </div>
        </div>
    )
}

export default ProductDetail;
