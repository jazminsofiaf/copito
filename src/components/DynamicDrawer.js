import React from "react";
import clsx from "clsx";
import { makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



export default function DynamicDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = window.innerWidth > 900;
    const [open, setOpen] = React.useState(isDesktop);

    const handleDrawerOpen = () => {
        console.log(isDesktop)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main
                  className={clsx(classes.content, {
                      [classes.contentShift]: open
                  })}
            >
                {props.children}

            </main>
            { (open &&
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronRightIcon />
                        </IconButton>
                        <ShoppingCartIcon/>
                        <Typography component="h4" variant="h5" className={classes.mainTitle}>
                            Carrito de compras
                        </Typography>
                    </div>
                    <Divider />

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="caption table">
                            <TableBody>
                                {props.products.map(product => {
                                    if (props.cart[product.id] !== undefined)
                                        return (
                                    <TableRow key={product.name}>

                                        <TableCell align="right">{props.cart[product.id] + 'x'}</TableCell>
                                        <TableCell align="right">{product.name}</TableCell>
                                        <TableCell align="right"> {product.price + '$' }</TableCell>
                                        <TableCell align="right">{product.price * props.cart[product.id] + '$' }</TableCell>
                                    </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    { Object.keys(props.cart).length > 0 &&
                    (<ListItem key={'total'}>
                        <ListItemText style={{flexGrow:1}}>
                            TOTAL
                        </ListItemText>
                        <ListItemText style={{flexGrow:0}}>
                            {
                                Object.entries(props.cart).map( ([productId, cant]) =>{
                                    const p = props.products.filter(product => product.id == productId).map(prod => prod.price);
                                    return cant * p;
                                }).reduce((price1, price2) => price1 + price2, 0) + '$'
                            }
                        </ListItemText>
                    </ListItem>)}
                </Drawer>
            )}
            <div>
            <Box mt={2} bgcolor={theme.palette.secondary.main} style={{borderRadius: '25px 0px 0px 25px'}} >
                <IconButton
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                    <ChevronLeftIcon />
                    <ShoppingCartIcon />
                </IconButton>
            </Box>
            </div>
        </div>
    );
}


const drawerWidth = 350;
const drawerWidthMobile = '100vw'
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },

    title: {
        flexGrow: 1
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            width: drawerWidthMobile,
            marginTop: theme.spacing(3),
        }
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.down("sm")]: {
            width: drawerWidthMobile,
        }

    },
    drawerHeader: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start"
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.down("sm")]: {
            marginRight: 0,
        }

    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0,
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        }
    }
}));
