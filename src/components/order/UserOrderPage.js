import React, { useState, useEffect } from 'react';
import CartDrawer from '../cart/CartDrawer';
import ProductFilter from '../product/ProductFilter';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UpperBar from "../UpperBar";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';


const orderEnpoint = '/orders';
const priceListEndpoint = '/price-list';

function getUserSelectionBox(props){
    return (
        <Autocomplete
                    id="users-box"
                    options={props.profiles}
                    getOptionLabel={(option) => option.name_summary + " - " + option.contact_summary}
                    disabled={props.cartHasItems}
                    onChange={(event, newValue) => {
                        props.setUser(newValue);
                      }}
                    renderInput={(params) => <TextField {...params} label="Seleccionar cliente" variant="outlined" />}
                />
    )
}


async function uploadOrder(props) {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };            
    const order = {
        owner_id: props.user.id,
        products: props.cartItems
    }
    alert(JSON.stringify(order, null, 2));
    try {
        await axios.post(orderEnpoint,order, options);
        alert("Orden creada con exito.");
    } catch (error) {
        alert("Error, algo fallo al crear la orden.");
    }
}

async function getProductsForUser(props) {
    // return [{"id": 123, "name": "productasdfasdfasdfasasffasdfsasdfasfas1", "amount": 2, "price": 100},
    // {"id": 1234, "name": "product1", "amount": 2, "price": 100}];
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        // await axios.get(priceListEndpoint+"?userId="+props.userId, options)
        await axios.get(priceListEndpoint, options)
        .then(function (response) {
            props.setProducts(response.data.price_list);
            alert(JSON.stringify(response.data, 2, null));
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar productos");
    }  
}

async function loadProfiles(props) {
    // return [{"id": 123, "name": "productasdfasdfasdfasasffasdfsasdfasfas1", "amount": 2, "price": 100},
    // {"id": 1234, "name": "product1", "amount": 2, "price": 100}];
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        return await axios.get("/profiles/summary", options)
        .then(function (response) {
            props.setProfiles(response.data.customers_summary);
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar productos");
    }  
}

function UserOrderPage(){
    const [profiles, setProfiles] = useState([{'id':123, 'name_summary': "Vet genio"}]);
    useEffect(() => {loadProfiles({setProfiles})},[])

    const [user, setUser] = useState();
    const [products, setProducts] = useState([{product_id: 123, name : "prod1" , subDescription: "subdesc1"},
    {product_id: 888, name : "prod3" , subDescription: "subdesc1"},
    {product_id: 1234, name : "prod2" , subDescription: "subdesc3"}]);
    useEffect(() => {
        if (user && user.id) {
            const userId = user.id;
            getProductsForUser({userId, setProducts});
            alert(JSON.stringify(products, 2, null));
        }
    }, [user]);

    const [cartItems, updateCart] = useState([]);

    function removeItem(itemToRemove) {
        updateCart(cartItems.filter(item => item.product_id !== itemToRemove.product_id));
       };

    function addItemToCart(props) {
        var added = false;
        cartItems.forEach((item) => {
            if (item.product_id == props.item.product_id) {
                item.amount = parseInt(item.amount) + parseInt(props.amount);
                added = true;
            }   
          });   
        updateCart([].concat(cartItems));
        if (!added) {
            updateCart(cartItems.concat([{"product_id": props.item.product_id, "name": props.item.name, "amount": props.amount, "price": 100}]));
        }
    }

    var cartHasItems = cartItems.length > 0;

    function createOrder() {
        if (cartHasItems)
        uploadOrder({user, cartItems})
    }

    return(
        <>
        <UpperBar/>
        <Container maxWidth="lg" style={{marginTop: "6em"}}>
            <Typography variant="h3">Pedido de cliente</Typography>
            <Grid container spacing={1}> 
                <Grid item container style={{backgroundColor:"#FDF0D5", borderRadius: '20px 20px 20px 20px', padding: '10px'}}>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper>
                            {getUserSelectionBox({setUser, cartHasItems, profiles})}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {user ? <ProductFilter products={products} onClick={addItemToCart}/> : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                    {user ? <CartDrawer elements={cartItems} onClick={{createOrder, removeItem}}/> : null}
                </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default UserOrderPage;