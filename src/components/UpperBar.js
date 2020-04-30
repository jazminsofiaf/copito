import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import authToken from "../providers/authToken";
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from 'react-router-dom';


function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Line( ) {
    return (
        <hr style={{
                color: 'black',
                backgroundColor: 'black',
                height: 2
            }}
        />
    );
}


class UpperBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            anchorEl: null,
        }
    }

    handleChange = (event) => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget});

    };

    handleCloseMenu = () => {
        //deja de mostrar el menu
        this.setState({anchorEl: null});
    };

    handleMyAccount = () => {
        console.log("mi cuenta");
        this.handleCloseMenu();
    }

    handleLogOut = () => {
        console.log("salir");
        authToken.removeToken();

        this.handleCloseMenu();
        this.props.history.push('/login');
    }

    handleClients = () => {
        console.log("clientes");
        this.handleCloseMenu();
        this.props.history.push('/backoffice/clients');
    }

    handleProviders = () => {
        console.log("proveedores");
        this.handleCloseMenu();
        this.props.history.push('/backoffice/providers');
    }

    handleProducts = () => {
        console.log("editar productos");
        this.handleCloseMenu();
        this.props.history.push('/backoffice/products');
    }

    goHomePage = () => {
        console.log("go products Page");
        this.props.history.push('/home');
    }

    goProductsPage = () => {
        console.log("go products Page");
        this.props.history.push('/products');
    }

    goContactUsPage = () => {
        console.log("go contact Page");
        this.props.history.push('/contactUs');
    }

    goFAQ = () => {
        console.log("go faq Page");
        this.props.history.push('/faq');
    }



    render() {
        const {classes} = this.props;
        const open = Boolean(this.state.anchorEl);
        const isLogged =  !(authToken.getToken() === null);
        const admin =  isLogged && (authToken.getToken() === 'admin');;

        return (
            <div>
                <CssBaseline/>
                <HideOnScroll {...this.props}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Hidden only={['sm', 'xs']}>
                                <Typography variant="h6" noWrap className={classes.mainTitle}>
                                    Florida Productos veterinarios
                                </Typography>
                            </Hidden>
                            <nav className={classes.menuBar}>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goHomePage}>Inicio</Button>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goProductsPage}>Productos</Button>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goFAQ}>Preguntas frecuentes</Button>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goContactUsPage}>Contactenos</Button>
                            </nav>
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleCloseMenu}>
                                    { isLogged ?
                                        (<div>
                                                <MenuItem onClick={this.handleMyAccount}>Mi cuenta</MenuItem>
                                                <MenuItem onClick={this.handleLogOut}>Salir</MenuItem>
                                            {admin &&
                                                (<div>
                                                    <Line/>
                                                    <MenuItem onClick={this.handleProducts}>Editar Productos</MenuItem>
                                                    <MenuItem onClick={this.handleClients}>Clientes</MenuItem>
                                                    <MenuItem onClick={this.handleProviders}>Proveedores</MenuItem>
                                                </div>)
                                            }
                                        </div>)
                                        : (  <MenuItem onClick={this.handleLogOut}>Iniciar Sesion</MenuItem>)
                                    }
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    mainTitle: {
        textAlign: 'left',
        flexGrow: 1,
    },
    menuBar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarItem: {
        margin: theme.spacing(1, 1.5),
        textTransform: 'none',
        alignItems: 'center',
        color: 'white',

        [theme.breakpoints.down("sm")]: {
            flexGrow: 1,
            alignItems: 'stretch',
        },
    },

});

export default   withRouter(withStyles(styles)(UpperBar));
