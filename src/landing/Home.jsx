import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { productContext } from '../App';
import { Link } from 'react-router-dom';

const Home = () => {

const {product, setProduct} = useContext(productContext)

const RandomNumber = Math.floor(Math.random() * 30)

  return (
    <div style={{backgroundColor: '#f0f4f8', height: '577px', width: '100%', position: 'relative', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>

    {product.filter((api, index) => index === RandomNumber).map((p) => ( 

      <img src={p.images} alt="Shop Icon"
           style={{width: '260px', height: '260px', marginBottom: '20px'}}/>

    ))}
    
      <Link to="/productslist"><Button variant="primary" size="lg" style={{padding: '10px 30px', fontSize: '18px', borderRadius: '8px'}}>
       View Products
      </Button></Link>

    </div>
  );
};

export default Home;
