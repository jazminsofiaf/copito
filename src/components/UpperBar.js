import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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

    goProductsPage = () => {
        console.log("go products Page");
    }

    goContactUsPage = () => {
        console.log("go contact Page");
    }


    render() {
        const {classes} = this.props;
        const open = Boolean(this.state.anchorEl);

        return (
            <div>
                <CssBaseline/>
                <HideOnScroll {...this.props}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Hidden only={['sm', 'xs']}>
                                <Typography variant="h6" className={classes.mainTitle}>
                                    Florida Productos veterinarios
                                </Typography>
                            </Hidden>
                            <ButtonGroup className={classes.menuBar}>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goProductsPage}>Productos</Button>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goContactUsPage}>Contactenos</Button>
                            </ButtonGroup>
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
                                    <MenuItem onClick={this.handleMyAccount}>Mi cuenta</MenuItem>
                                    <MenuItem onClick={this.handleLogOut}>Salir</MenuItem>
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
    mainTitle: {
        float: 'left',
    },
    menuBar: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarItem: {
        textTransform: 'none',
        alignItems: 'center',
        width:'15%',

        [theme.breakpoints.down("sm")]: {
            flexGrow: 1,
            alignItems: 'stretch',
        },
    },

});

export default   withRouter(withStyles(styles)(UpperBar));
