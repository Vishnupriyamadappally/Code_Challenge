import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './landing/NavBar'
import Home from './landing/Home'
import ProductList from './Product/ProductList'
import ProductDetaile from './Product/ProductDetaile'
import Footer from './landing/Footer';

const productContext = createContext()

function App() {

  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);    

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('https://dummyjson.com/products')
         .then((res) => {setProduct(res.data.products);
         setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading products...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;

console.log(product);

  return (
    <>
      <BrowserRouter>
      <productContext.Provider value={{product,setProduct}}>
    
      <NavBar />
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productslist" element={<ProductList />} />
        <Route path="/productdetails/:id" element={<ProductDetaile />} />
      </Routes>

        <Footer/>

      </productContext.Provider>
      </BrowserRouter>

    </>
  )
}

export default App
export {productContext}
