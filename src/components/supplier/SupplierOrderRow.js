import React from 'react';
import SupplierOrderPage from '../supplierOrder/SupplierOrderPage';
import Grid from '@material-ui/core/Grid'
import { Paper } from '@material-ui/core';



function SupplierOrderRow(props) {
    const order = props.order;

    return (
        <Paper>
            <Grid container spacing={1} style={{marginBottom:'10px'}}>
                <Grid item xs={4}>Nombre: {order.name}</Grid>
                <Grid item xs={2}>Fecha: {order.emission_date}</Grid>
                <Grid item xs={2}>Cant. items:{order.items.length}</Grid>
                <Grid item xs={4}>Total: {order.total_cost}</Grid>
                <Grid item xs={4}>No. Orden: {order.order_numer}</Grid>
                <Grid item xs={4}>Estado: {order.status}</Grid>
                <Grid item xs={4}><button onClick={() => props.openModal(order)}>view</button></Grid>
            </Grid>
        </Paper>
    )
}

export default SupplierOrderRow;