import React, { useState, useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../UpperBar";
import axios from 'axios';
import Orders from './Orders';

async function loadOrders(props) {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        return await axios.get("/orders/users/complete", options)
        .then(function (response) {
            props.setOrders(response.data.order_list);
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar clientes");
    }  
}


function UserOrdersPage(props) {
    const { classes } = props;
    const [orders, setOrders] = useState([]);

    useEffect(() => { loadOrders({ setOrders }) }, [])

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Ordenes clientes</Typography>
                <Orders orders={orders} />
            </Container>
        </>
    )

}

const styles = theme => ({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(UserOrdersPage);