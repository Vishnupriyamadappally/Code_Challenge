import React, { useContext } from 'react'
import { productContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Rating from '@mui/material/Rating';

const ProductDetaile = () => {

const { id } = useParams();

const {product, setProduct} = useContext(productContext)

const item = product.find(p => p.id === parseInt(id));

  return (
    <div style={{backgroundColor:"#f0f4f8", height:"577px"}}>
    <Container className="py-4">
    
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image src={item.images} style={{ maxHeight: '500px', objectFit: 'cover' }}/>
        </Col>
        <Col md={6}>

           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <h2>{item.title}</h2>
          <h5 style={{ color: item.availabilityStatus === "Low Stock" ? "red" : item.availabilityStatus === "In Stock" ? "green" : "" }}>
                       ({item.availabilityStatus} )</h5>
          </div>
          <hr />
          <h5 className="text-muted mb-3">Product Details</h5>
          <p>{item.description}</p>
          
          <h6>Category: <span className="text-secondary">{item.category}</span></h6>
          <h6>Price: <span className="text-danger">${item.price}</span></h6>
          <Rating name="half-rating" defaultValue={item.rating} precision={0.5} />
         <div className="mt-4">
            <Link to="/productslist" className="btn btn-secondary ms-2">Back</Link>
          </div>
        </Col>
      </Row>
     
    </Container>
  </div>
  )
}

export default ProductDetaile