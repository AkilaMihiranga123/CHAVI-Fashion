import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ProductImageGallery from "./ProductImageGallery";

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
                <h1 className="text-center"> {Products.product_name} </h1><br/><br/>
                    <div className="row">
                            <div className="col-md-5 lg">
                                <ProductImageGallery detail={Products} />
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ProductDetail;
