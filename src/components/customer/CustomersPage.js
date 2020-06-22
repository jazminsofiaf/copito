import React, { useState, useEffect } from 'react';
import CustomersList from './CustomersList'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../UpperBar";
import axios from 'axios';

async function loadCustomers(props) {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        return await axios.get("/profiles/summary", options)
        .then(function (response) {
            props.setCustomers(response.data.customers_summary);
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar clientes");
    }  
}


function CustomerPage(props) {
    const { classes } = props;
    const [customers, setCustomers] = useState([]);

    useEffect(() => { loadCustomers({ setCustomers }) }, [])

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Clientes</Typography>
                <CustomersList customers={customers} />
            </Container>
        </>
    )

}

const styles = theme => ({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(CustomerPage);