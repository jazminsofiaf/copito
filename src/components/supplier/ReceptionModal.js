import React, { useState } from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Reception from "./Reception";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const receptionFormEndpoint = '/reception'

const item = {
    id: '',
    name: '',
    price: '',
    expiration_date: '',
    amount: '',
}

const initialValues = {
    order_id: '',
    items: [item],
    total: '',
};

const validationSchema = Yup.object().shape({
    order_id: Yup.string()
        .required(),
    total: Yup.number()
        .required('Introducir total'),
    items: Yup.array().of(Yup.object({
        id: Yup.string()
            .required(),
        expiration_date: Yup.date('Falta fecha')
            .required('Fecha requerida'),
        price: Yup.number()
            .required('Falta precio'),
        amount: Yup.string()
            .matches(/^[0-9]*$/, 'Invalid amount')
            .max(8)
            .required('Falta cant.'),
    })),
});

function validateReception(receptionRequest) {
    var valid = receptionRequest.items.map((item) => (item.expiration_date != undefined && item.expiration_date != null && !isNaN(item.expiration_date))).reduce((acc, next) => acc && next);
    return valid;
}

function ReceptionModal(modalOrder) {

    if (modalOrder.items) {
        var originalItems = modalOrder.items.map((item) => ({ 'id': item.id, 'name': item.name, 'amount': item.amount, 'original_price': item.price, 'price': item.price }));
        initialValues.order_id = modalOrder.id;
        initialValues.items = originalItems;
        initialValues.total = modalOrder.total_cost;
    }

    function onSubmit(values) {
        var validReception = validateReception(values);
        if (validReception) {
            alert(JSON.stringify(values, 2, null));
            sendRequest(values);
        } else {
            alert("Invalid reception");
        }
    }

    async function sendRequest(values) {
        // const options = {
        //     headers: { 'Content-Type': 'application/json' }
        // };
        // const profile = {
        //     new_profile: values
        // }
        // try {
        //     await axios.post(receptionFormEndpoint,
        //         profile, options);
        //     alert("Felicidades, solicitud exitosa!.\nPronto nos pondremos en contacto para habilitar la cuenta.\nMuchas gracias!");
        // } catch (error) {
        //     alert("Error, perfil invalido.\nSi el error persiste contactenos.");
        // }
    }

    return (
        <Formik initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form>
                    <Paper>
                        <Grid container spacing={1}>
                            <Grid container item style={{ textAlign: 'left' }}>
                                <Grid item xs={8}>
                                    <div>{modalOrder.name ? <div>{modalOrder.name}</div> : <div>Nothing selected</div>}</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>{modalOrder.status}</div>
                                </Grid>
                                <Grid item xs={8}>
                                    <div>{modalOrder.order_numer}</div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Reception values={values} />
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                <Field name={`total`}>
                                    {({ field, meta }) =>
                                        <TextField
                                            {...field}
                                            type="number"
                                            required
                                            label="Total"
                                            value={values.total}
                                            variant='outlined'
                                        />
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="secondary">Cargar Recepcion</Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </Form>
            )}
        </Formik>
    )
}

export default ReceptionModal;