import React, { useState, useEffect } from 'react';
import SupplierOrderRow from "./SupplierOrderRow"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import UpperBar from "../UpperBar";
import CommonModal from "../shared/CommonModal"
import CartElementContainer from "../cart/CartElementContainer"
import ReceptionModal from "./ReceptionModal"
import SearchRow from "../shared/SearchRow"
import { isValid } from 'date-fns';
import axios from 'axios';

async function loadSupplierOrders(props) {
    // props.setOrders([{ "id": 1, "name": "Zoovet", "items": [{"id":123, "amount": 3, "name": "prod10", "price": 123}, {"id":1000, "amount": 2, "name": "Super megar nombre de producto", "price": 1000}], "total_cost": 12345, "order_numer": "number", "status": "pending", "emission_date": "17/05/2020" },
    // { "id": 2, "name": "Barandu", "items": [{"id":123, "amount": 1, "name": "prod10", "price": 10}, {"id":1000, "amount": 2, "name": "Super megar nombre de producto", "price": 6}], "total_cost": 12345, "order_numer": "number", "status": "pending", "emission_date": "17/05/2020" }]);
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        return await axios.get("/suppliers/orders/complete", options)
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

function OrderModal(props) {
    const modalOrder = props.modalOrder;

    return (
        <Paper>
            <Grid container spacing={1}>
                <Grid container item style={{ textAlign: 'left' }}>
                    <Grid item xs={8}>
                        <div>{modalOrder.owner_summary ? <div>{modalOrder.owner_summary}</div> : <div>Nothing selected</div>}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>{modalOrder.status}</div>
                    </Grid>
                    <Grid item xs={8}>
                        <div>{modalOrder.order_numer}</div>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CartElementContainer elements={modalOrder.products} />
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary">Editar</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary">Eliminar</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" onClick={() => props.openReception()}>Ingresar</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

function SupplierOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => { loadSupplierOrders({ setOrders }) }, [])

    const [modalOrder, setModalOrder] = useState({});
    //Order modal
    const [open, setOpen] = useState(false);
    const [filterText, setFilterText] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    function clickView(order) {
        setModalOrder(order);
        setOpen(true);
    }

    function passesFilter(order) {
        return order && order.owner_summary ? !(order.owner_summary.toLowerCase().indexOf(filterText.toLowerCase()) === -1) : false;
    }

    const ordersView = orders.filter((order) => passesFilter(order))
        .map((order) => (<SupplierOrderRow key={order.id} order={order} openModal={clickView} />));

    const orderModal = OrderModal({ modalOrder, openReception });

    //Reception modal
    const [openReceptionModal, setOpenReceptionModal] = useState(false);

    const handleCloseReception = () => {
        setOpenReceptionModal(false);
    };

    function openReception(order) {
        setOpenReceptionModal(true);
    }

    const receptionModal = ReceptionModal(modalOrder);

    return (
        <>
            <UpperBar />
            <Container maxWidth='lg' style={{ marginTop: "6em" }}>
                <Typography variant="h3">Pedidos a proveedores</Typography>
                <SearchRow filterText={filterText} label={'Buscar pedido'} update={setFilterText} />
                {ordersView}
                <CommonModal render={orderModal} state={open} handleClose={handleClose} />
                <CommonModal render={receptionModal} state={openReceptionModal} handleClose={handleCloseReception} />
            </Container>
        </>
    )
}

export default SupplierOrders;