import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import SearchRow from './SearchRow';
import Container from '@material-ui/core/Container';
import './ProductRowDetails.css';
import axios from 'axios';


const productsEndpoint = "/price-list";

async function loadProducts(setProducts) {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        await axios.get(productsEndpoint, options)
        .then(function (response) {
            console.log(response.data.price_list);
            setProducts(response.data.price_list);
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar productos");
    }
}


function ProductPage() {
    const [filterText, setFilterText] = useState('');
    const [products, setProducts] = useState([{id: '123', name : "prod1" , subDescription: "subdesc1"}, {id: '12314', name : "prod2" , subDescription: "subdesc3"}]);

    useEffect(() => {
        loadProducts(setProducts);
      }, []);

    return (
        <Container maxWidth="md">
            <div className="search-box">
                <SearchRow filterText={filterText} update={setFilterText}/>
            </div>
            <ProductList products={products} filterText={filterText}/>
        </Container>
    )
}

export default ProductPage;