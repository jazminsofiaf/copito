import React from 'react'
import './ProductRowDetails.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import bovinos from './Bovinos.gif';


function productHeader(props) {
    return (
        <>
            <div className="product-title">
                {props.product.name}
            </div>
            <div className="product-subtitle">
                {/* {props.product.subDescription} */}
                sub-description
            </div>
        </>
    )
}

function handleClick(props) {
    console.log(props);
    alert(props.product.name + " You dont want to see this. Really!");
}

function productPrice(price) {
    return (
        <div className="product-price">$ {price}</div>
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
        // <Grid container spacing={1}>
            // <Grid item xs={1}><img src={bovinos} /></Grid>
            // <Grid item xs={1}><img src={bovinos} /></Grid>
            // <Grid item xs={1}><img src={bovinos} /></Grid>
        // </Grid>
    )
}

function ProductRowDetails(props) {
    return (
        <Paper className="product-box">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <img src={props.product.thumbnail} className="product-img" />               
                </Grid>
                <Grid item xs={12} sm={9} style={{textAlign:"left"}} container >
                        <Grid item xs={12} sm={12}>{productHeader(props)}</Grid>
                        <Grid item xs={12} sm={3}>{productPrice('1000.00')}</Grid>
                        <Grid item xs={12} sm={12}>Laboratiorio</Grid>
                        <Grid item xs={10} sm={10}>{getSpecies(null)}</Grid>
                        {/* <Grid item xs={3} sm={}> </Grid> */}
                        <Grid item xs={2} sm={2}><button className="button" onClick={() => handleClick(props)}><span>Ver </span></button></Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}


export default ProductRowDetails;