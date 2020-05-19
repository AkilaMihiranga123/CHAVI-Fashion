import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ProductImageSlider from "./ProductImageSlider";
import './productDesign.css';
import { Link } from 'react-router-dom';

function ProductList(props) {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/product/get-products')
        .then(response => {
            if (response.data.success) { 
                setProducts(response.data.products)
                console.log(response.data.products)
            } else {
                alert('Failed to fectch product data')
            }
        })

    }, []);

    const onDeleteProduct = (id) => {
        
    }

    const onEditProduct = () => {
        
    }

    const renderCards = Products.map((product, index) => { 
        console.log(product);
        return <div key={product._id}>
             <div className="card" style={{backgroundColor: 'pink'}}>
                {<a href={`/product/${product._id}`} >
                    <ProductImageSlider images={product.product_image} /></a>}

                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="btn btn-outline-success btn-lg btn-block"
                                    onClick={onEditProduct}>Edit</button>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className="btn btn-outline-danger btn-lg btn-block "
                                    onClick={() => {onDeleteProduct(product._id)}}>Delete</button>
                        </div>
                    </div>                
                </div> 
        </div>
    })
    
        return (
           <div>
               <Header/>
               
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1><a className="btn btn-warning col-md-12" href="/add-product"><i className="fa fa-plus"></i> Add New Product</a></h1>
                            <br/><br/>
                            <h1 className="text-center"> Store Manager Product List </h1>
                            {Products.length === 0 ?
                                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                                    <h2>No post yet...</h2>
                                </div> :
                                <div className="Content"><br/>
                                    <div className="ProductArea">
                                        {renderCards}
                                    </div>  
                                </div>
                            }
                            <br /><br />
                        </div>
                    </div> 
           </div>   
        );
}

export default ProductList;

