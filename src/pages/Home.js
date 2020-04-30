import React from 'react';
import logo from '../components/logo.svg';
import UpperBar from "../components/UpperBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PetsIcon from "@material-ui/icons/Pets";

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <UpperBar/>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.image} >

                    </Grid>
                    <Grid item xs={6} sm={3} >
                        <Paper className={classes.paper}>Envios</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>Como Comprar?</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>Perros</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>Gatos</Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',

        height: '100vh',
        backgroundPosition: 'center',
    },
    icon: {
        color: 'antiquewhite',
    },
    titleContainer: {
        backgroundSize: 'cover',
        backgroundColor:  theme.palette.primary.main,
    },
    mainTitle: {
        color: 'antiquewhite',
        fontWeight: 900,
    },  
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.primary.main,
        height:300,
    },
});


export default withStyles(styles)(Home);
