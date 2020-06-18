import React from 'react';
import ReceptionRow from "./ReceptionRow"
import Grid from '@material-ui/core/Grid';
import { FieldArray} from "formik";



function Reception(props) {
    // const items = props.items.map((item) => (
    //     <ReceptionRow key={item.id} item={item} onClick={props.onClick} />
    // ));

    const values = props.values;

    return (
        <div style={{ backgroundColor: '#F7EDE2', fontWeight: 'bold' }}>
            <Grid container spacing={1}>
                <Grid item xs={6}>Nombre</Grid>
                <Grid item xs={1}>$ u/orig</Grid>
                <Grid item xs={1}>Cant.</Grid>
                <Grid item xs={3}>Vencimiento</Grid>
                <Grid item xs={1}>$ u/Fact</Grid>
            </Grid>
            <FieldArray name={"items"}>
                {({ push, remove }) => (
                    <>
                    {values.items && values.items.length > 0 && values.items.map((item, index) =>
                            <ReceptionRow key={`items[${index}]`} item={item} onClick={props.onClick} index={index}/>
                        )}
                    </>
                )}
            </FieldArray>
        </div>
    )

}

export default Reception;