import React, { useState } from 'react'
import './ProductRowDetails.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import bovinos from './Bovinos.gif';
import TextField from '@material-ui/core/TextField';
import InputBase from "@material-ui/core/InputBase";
import {
    makeStyles,
  } from "@material-ui/core/styles";
import { BorderAllRounded } from '@material-ui/icons';



function productHeader(props) {
    return (
        <>
            <div className="product-title">
                {/* {props.product.name} */}
                Nombre del producto - presentacion
            </div>
            <div className="product-subtitle">
                {/* {props.product.subDescription} */}
                description - categoria
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

function validAmount(value) {
    return value > 0 ? value : 1;
}

function AmountField(props) {
    const [amount, setAmount] = useState(1);
    const item = props.product;
    const classes = usesStyles();

    return(
        <div className="add-item-box">
            <InputBase
                className={classes.amountBox}
                variante='filled'
                value={amount}
                color="secondary"
                type="number"
                size="small"
                onChange={(e) => setAmount(validAmount(e.target.value))}
                />
            <button className="button" onClick={() => props.addToCart({item, amount})}><span>+Agregar </span></button>
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
                        <Grid item xs={6} sm={8}>{getSpecies(null)}</Grid>
                        <Grid item xs={6} sm={4}>{AmountField({product, addToCart})}</Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

const usesStyles = makeStyles(theme => ({
    amountBox:{
        color:'rgb(60, 145, 230);',
        paddingLeft: '0.4em',
        backgroundColor: 'white',
        margin: '3px',
    },
  }));

export default ProductRowDetails;