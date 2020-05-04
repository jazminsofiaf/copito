import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Florida-ProductosVeterinarios
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}





class SingUp extends React.Component{

    handleSingUp = (event) => {
        this.props.history.push('/login');
    }
    render() {
        const { classes } = this.props;
        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear cuenta
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="company"
                                label="Vererinaria"
                                name="company"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cuil"
                                label="Cuil"
                                name="cuil"
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <Typography variant="subtitle1"  align="left"  className={classes.mainTitle}>
                                Direccion
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="street"
                                        label="Calle"
                                        name="street"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="streetNumber"
                                        label="Altura"
                                        name="streetNumber"
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="floor"
                                        label="Piso"
                                        name="floor"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>



                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Si, deseo recibir ofertas por email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Crear cuenta
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link variant="body2"  onClick={this.handleSingUp}>
                                Ya tienes una cuenta? Inicia sesion
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


export default withStyles(styles)(SingUp);