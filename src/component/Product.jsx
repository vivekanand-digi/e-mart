import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    toast("item added to cart");
    dispatch(addCart(product));
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      let response = await fetch(`http://localhost:3000/products/${id}`);
      response = await response.json();
      console.log(response)
      setProduct(response);
      setLoading(false);
    }
    getProduct();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={50} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    )
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="col-md-6">
          <img src={product.image} height="300px" width="200px" />
        </div>
        <div className="col-md-6">
          <h1 height="200px" width="280px">{product.title} </h1>
          <h3 height="200px" width="190px"> Price:₹{product.price} </h3>
          <h2 className="color"><h3>Color: </h3>{product.color}</h2>
          <h2 className="rating"> <h3>Rating: </h3>
            {Array(product.rating).fill().map((_) => (<p>⭐</p>))}</h2>
          <h3 className="lead"><h3>Specifications: </h3>{product.details}</h3>
          <h3 className="warranty"><h3>Warranty:</h3>{product.warranty}</h3>
          <button className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}>Add to Cart</button>
          <NavLink to="/cart" className="btn btn-outline-dark px-4 py-2">Buy Now</NavLink>
        </div>
        <ToastContainer />
      </>
    )
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProducts />}

        </div>
      </div>
    </div>
  );
}
export default Product;
