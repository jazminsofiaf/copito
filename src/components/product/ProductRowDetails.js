import React from 'react'
import './ProductRowDetails.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import bovinos from './Bovinos.gif';
import AmountField from '../shared/AmountField'


function productHeader(props) {
    return (
        <>
            <div className="product-title">
                {props.product.presentation ?  props.product.name + " - " + props.product.presentation : props.product.name}
            </div>
            <div className="product-subtitle">
                {/* {props.product.subDescription} */}
                description - categoria
            </div>
        </>
    )
}


function productPrice(price) {
    return (
        <div className="product-price">{price}</div>
    )
}

function getSpecies(species) {
    const row = [1, 2, 3, 5, 6, 7];
    const images = row.map((specie) => (
        <img key={specie} src={bovinos} alt="bovinos"/>
    ))
    return (
        <div>
            {images}
        </div>
    )
}

function ProductRowDetails(props) {
    const product = props.product;
    const addToCart = props.onClick;

    return (
        <Paper className="product-box">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <img src={props.product.thumbnail} className="product-img" />               
                </Grid>
                <Grid item xs={12} sm={9} style={{textAlign:"left"}} container >
                        <Grid item xs={12} sm={9}>{productHeader(props)}</Grid>
                        <Grid item xs={12} sm={3}>{productPrice(product.price)}</Grid>
                        <Grid item xs={12} sm={9}>Marca</Grid>
                        <Grid item xs={12} sm={3}>Stock: 1u</Grid>
                        <Grid item xs={6} sm={9}>{getSpecies(null)}</Grid>
                        <Grid item xs={6} sm={3}>{AmountField({product, addToCart})}</Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProductRowDetails;