
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { Button } from '@mui/material';

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const [filter, setFilter]= useState(0);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            let response = await fetch("http://localhost:3000/products");
            response = await response.json();
            setData(response)
            setLoading(false)

            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);


    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton />
                </div>
            </>
        );
    };

    const renderData = filter => {
        let _data = [];
        if(filter === 0){
            _data = data.filter(product  => product.cardId === 1|| 2);
        } else if (filter === 1){
            _data = data.filter(product  => product.cardId === 1);
        } else if(filter === 2) {
            _data = data.filter(product  => product.cardId === 2);
        }
        return _data;
    }

    const ShowProducts = () => {

        return (
            <>
                <div className="buttons">
                    <button className="btn btn-outline-dark" onClick={()=>setFilter(0)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(1)}>Electronics</button>
                    <button className="btn btn-outline-dark" onClick={()=>setFilter(2)}>TVs&Appliances</button>
                </div>
                <div className="buttons d-flux justify-content-center mb-5 pb-5">
                </div>
                {/* {data.filter(product => product.cartId == filter ).map((product) => { */}
                    {renderData(filter).map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div class="card h-100 text-center p-4 key={product.id}">
                                    <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                                    <div class="card-body">
                                        <Link to={`/products/${product.id}`} class="card-title mb-0">{product.title.substring(0, 12)}....</Link>
                                        <p class="card-text  lead fw-bold">₹{product.price}</p>
                                        <button class="btn btn-outline-dark">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
}
export default Products;




