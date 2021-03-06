import React, { useState } from 'react';
import CustomerRow from "./OrderRow"
import SearchRow from "../shared/SearchRow"
import Grid from '@material-ui/core/Grid';
import OrderRow from './OrderRow';


function Orders(props) {
    const [filterText, setFilterText] = useState('');

    const orderList = props.orders.filter((order) => passesFilter(order))
        .map((filteredOrder) => (
            <OrderRow key={filteredOrder.id} order={filteredOrder} onClick={props.onClick}/>
        ));

    function passesFilter(order) {

        return order && order.owner_summary ? !(order.owner_summary.toLowerCase().indexOf(filterText.toLowerCase()) === -1) : true;
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}><SearchRow filterText={filterText} label={'Buscar cliente'} update={setFilterText} /></Grid>
                <Grid item xs={12}>{orderList}</Grid>
            </Grid>
        </div>
    )

}

export default Orders;