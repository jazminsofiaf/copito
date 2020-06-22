import React from 'react';
import { Paper, Grid, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import axios from 'axios';


async function deliverOrder(props) {
    const orderId = props.order.id;
    alert(props.order.id)
    props.order.status = "DELIVERED";
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        const endpointDelivery = "/orders/" + orderId + "/deliver"
        await axios.put(endpointDelivery, options);
        alert("Orden entregada con exito.");
    } catch (error) {
        alert("Error, algo fallo al entregar la orden.");
    }
}

function BuildOrder(props) {
    const order = props.order;
    let history = useHistory();

    return (
        <Paper>
            <Grid container spacing={1}>
                <Grid item xs={4}>{order.id}</Grid>
                <Grid item xs={4}>Emision: </Grid>
                <Grid item xs={4}>Importe: </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Button variant='outlined' color='primary' onClick={() => deliverOrder({order, history})}>Entregar</Button>
        </Paper>
    )
}

export default BuildOrder;