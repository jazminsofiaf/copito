import React, { useState } from 'react';
import CartDrawer from '../cart/CartDrawer';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UpperBar from "../UpperBar";
import Grid from '@material-ui/core/Grid'
import SupplierProductFilter from './SupplierProductFilter'


const orderEnpoint = '/supplier/order';

function supplierSelection(props){
    return (
        <Autocomplete
                    id="users-box"
                    options={props.suppliers}
                    getOptionLabel={(option) => option.name_summary}
                    disabled={props.cartHasItems}
                    onChange={(event, newValue) => {
                        props.setSupplier(newValue);
                      }}
                    renderInput={(params) => <TextField {...params} label="Seleccionar proveedor" variant="outlined" />}
                />
    )
}

async function uploadOrder(props) {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };            
    const order = {
        owner_id: props.supplier.id,
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


function SupplierOrderPage(){
    const [cartItems, updateCart] = useState([]);
    const [suppliers, setSupplierList] = useState([{"id":"123", "name_summary": "Supplier1"}, {"id":"1233", "name_summary": "Supplier2"}, {"id":"1263", "name_summary": "Supplier3"}])
    const [supplier, setSupplier] = useState();
    const [supplierItems, setSupplierItems] = useState([{"id":"1", "name": "Product1", "cost":123}, {"id":"2", "name": "Product2", "cost":1003}])

    function removeItem(itemToRemove) {
        updateCart(cartItems.filter(item => item.id !== itemToRemove.id));
    };

    function addItemToCart(props) {
        var added = false;
        cartItems.forEach((item) => {
            if (item.id == props.item.id) {
                item.amount = parseInt(item.amount) + parseInt(props.amount);
                added = true;
            }   
          });   
        updateCart([].concat(cartItems));
        if (!added) {
            updateCart(cartItems.concat([{"id": props.item.id, "name": props.item.name, "amount": props.amount, "price": 100}]));
        }
    }

    var cartHasItems = cartItems.length > 0;

    function createOrder() {
        if (cartHasItems)
        uploadOrder({supplier, cartItems})
    }

    return (
        //Select supplier
        //Product searcher
        //cart
        <>
        <UpperBar/>
        <Container maxWidth="lg" style={{marginTop: "6em"}}>
            <Typography variant="h3">Orden a proveedor</Typography>
            <Grid container spacing={1}>
            <Grid item container style={{backgroundColor:"#FDF0D5", borderRadius: '20px 20px 20px 20px', padding: '10px'}}>
                <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Paper disabled={cartHasItems}>
                            {supplierSelection({setSupplier, suppliers, cartHasItems})}
                        </Paper>
                    </Grid>
                </Grid>
            <Grid item xs={12} sm={8}>
                {supplier ? <SupplierProductFilter items={supplierItems} onClick={addItemToCart}/> : null}
            </Grid>
            <Grid item xs={12} sm={4}>
                {supplier ?<CartDrawer elements={cartItems} onClick={{createOrder, removeItem}}/> : null}
            </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default SupplierOrderPage;