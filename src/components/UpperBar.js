import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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




const useStyles = makeStyles((theme) => ({
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

}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


export default function UpperBar(props) {
    const classes = useStyles();

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        //deja de mostrar el menu
        setAnchorEl(null);
    };

    const handleMyAccount = () => {
        console.log("mi cuenta");
        handleClose();
    }

    const handleLogOut = () => {
        console.log("salir");
        handleClose();
    }

    const goProductsPage = () => {
        console.log("go products Page");
    }

    const goContactUsPage = () => {
        console.log("go contact Page");
    }

    return (
        <div>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Hidden only={['sm', 'xs']}>
                            <Typography variant="h6" className={classes.mainTitle}>
                                Florida Productos veterinarios
                            </Typography>
                        </Hidden>
                        <ButtonGroup className={classes.menuBar}>
                            <Button variant="text" className={classes.menuBarItem} onClick={goProductsPage}>Productos</Button>
                            <Button variant="text" className={classes.menuBarItem}  onClick={goContactUsPage}>Contactenos</Button>
                        </ButtonGroup>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
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
                                onClose={handleClose}>
                                <MenuItem onClick={handleMyAccount}>Mi cuenta</MenuItem>
                                <MenuItem onClick={handleLogOut}>Salir</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
}
