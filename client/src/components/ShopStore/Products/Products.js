import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ProductImageSlider from "../../../containers/ProductManagemet/ProductImageSlider";
import '../../../containers/ProductManagemet/productDesign.css';
import './style.css';

function Products(props) {

    const [Products, setProducts] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/product/get-products')
        .then(response => {
            if (response.data.success) { 
                setProducts(response.data.products)
                console.log(response.data.products)
            } else {
                alert('Somthing Wrong...');
            }
        })

    }, []);

    const onDeleteProduct = (id) => {
        axios.delete('http://localhost:5000/product/delete-product/'+id)
           .then(res =>{
                console.log(res.data);
                alert('Product Delete Successfully');
           }); 
    }


    const UploadedProduct = Products.map((product, index) => { 
        return <div key={product._id}>
             <div className="card" style={{backgroundColor: '#FFF0F5'}}>
                {<a href={`/product/${product._id}`} >
                    <ProductImageSlider images={product.product_image} /></a>}

                    <div style={{ display: 'flex', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <p> {product.product_name}</p>
                    </div>
                    <div style={{ display: 'flex', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <p> {`Rs.${product.product_price}/=`}</p>
                    </div>
                               
                </div> 
        </div>
    })
    
        return (
           <div>
                    <div className="col-md-10 m-auto">
                        <div className="card card-body"><br/>
                        <h2 className="CategoryTitle" style={{display: 'flex', justifyContent: 'center'}}> Our Products</h2>
                            <br/>
        
                            {Products.length === 0 ?
                                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                                    <h2>No post yet...</h2>
                                </div> :
                                <div className="Content"><br/>
                                    <div className="ProductArea">
                                        {UploadedProduct}
                                    </div>  
                                </div>
                            }
                            <br /><br />
                        </div>
                    </div> 
           </div>   
        );
}

export default Products;





