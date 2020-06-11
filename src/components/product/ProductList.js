import React from 'react';
import ProductRowDetails from './ProductRowDetails'

function filterProducts(props) {
    const rows = [];

    props.products.forEach((product) => {
        if (product.name.toLowerCase().indexOf(props.filterText.toLowerCase()) === -1) {
          return;
        }
        rows.push(
          <ProductRowDetails
            product={product}
            key={product.name}
          />
        );
      });   
      return rows;
}

function ProductList(props) {
    const productList = filterProducts(props);

    return (
        <>
            {productList}
        </>
    )
}

export default ProductList;