import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { productContext } from '../App';
import Rating from '@mui/material/Rating';
import Container from 'react-bootstrap/esm/Container';
import { Col, Row, Form } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

const ProductList = () => {
  const { product } = useContext(productContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category');
  const selectedSort = searchParams.get('sort');
  const searchQuery = searchParams.get('search'); 

  const categories = [...new Set(product.map((p) => p.category))];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSort]);

  const SearchChange = (e) => {
    const search = e.target.value;

    const params = {};
    if (search) params.search = search;
    if (selectedCategory) params.category = selectedCategory;
    if (selectedSort) params.sort = selectedSort;

    setSearchParams(params);
  };

  const CategoryChange = (e) => {
    const category = e.target.value;

    const params = {};
    if (category) params.category = category;
    if (selectedSort) params.sort = selectedSort;
    if (searchQuery) params.search = searchQuery;

    setSearchParams(params);
  };

  const SortChange = (e) => {
    const sort = e.target.value;

    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (sort) params.sort = sort;
    if (searchQuery) params.search = searchQuery;

    setSearchParams(params);
  };

  let filteredProducts = product;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedSort === 'lowToHigh') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'highToLow') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div style={{backgroundColor:"#f0f4f8"}}>
    <Container className="py-4">
      <h1 style={{ textAlign: 'center', color:"blue"}}>PRODUCTS</h1>
       <br />
      <Row className="justify-content-center mb-4">

       <Col xs={12} md={4} className="mb-3">
      <Form.Group className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <Form.Label>Search by Product Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchQuery || ''}
          onChange={SearchChange}/>
      </Form.Group>
      </Col>

 <Col xs={12} md={4} className="mb-3">
      <Form.Group className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Select value={selectedCategory || ''} onChange={CategoryChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat}> {cat} </option> ))}
        </Form.Select>
      </Form.Group>
      </Col>

 <Col xs={12} md={4} className="mb-3">
      <Form.Group className="mb-4" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <Form.Label>Sort by Price:</Form.Label>
        <Form.Select value={selectedSort || ''} onChange={SortChange}>
          <option value="">None</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </Form.Select>
      </Form.Group>
      </Col>

      </Row>

      <Row style={{ paddingTop: '30px' }}>
        {currentProducts.length > 0 ? ( currentProducts.map((p, index) => (
            <Col key={index} className="mb-4 d-flex" md={4}>
              <Card style={{ width: '100%' }} className="h-100 d-flex flex-column">
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                  <Card.Img src={p.images} style={{ width: '300px', height: '300px', objectFit: 'contain' }}/>
                </div>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Title>
                    <span style={{ color: 'blue' }}>Category:</span> {p.category}
                  </Card.Title>
                  <Card.Title>
                    <span style={{ color: 'red' }}>Price:</span> ${p.price}
                  </Card.Title>
                  <Rating name="half-rating" defaultValue={p.rating} precision={0.5} />
                  <Card.Text>
                    {p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description}
                  </Card.Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Card.Title
                      style={{color: p.availabilityStatus === 'Low Stock' ? 'red' : p.availabilityStatus === 'In Stock'
                            ? 'green' : ''}}> {p.availabilityStatus}</Card.Title>
                    <Link to={`/productdetails/${p.id}`}>
                      <Button variant="primary">View Details</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No products found.</p>
        )}
      </Row>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap', gap: '10px' }}>
          <Button variant="secondary" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}               disabled={currentPage === 1}> Previous </Button>

          {[...Array(totalPages)].map((_, index) => (
            <Button key={index} variant={currentPage === index + 1 ? 'primary' : 'outline-primary'}
              onClick={() => setCurrentPage(index + 1)}> {index + 1} </Button> ))}

          <Button variant="secondary" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}> Next </Button>
        </div>
      )}
    </Container>
  </div>
  );
};

export default ProductList;