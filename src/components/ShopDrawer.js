import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CardItem from "../components/CartItem";



class ShopDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,

        }  = this.props;

        const shopCartCount = 2;
        return (
            //<Hidden only={['sm', 'xs']}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="right">
                    <Toolbar className={classes.cartToolBar}/>
                    <div className={classes.drawerContainer}>
                        <nav >
                            <Toolbar className={classes.cartToolBar}>
                                <Typography variant="h6" noWrap>
                                    Carrito
                                </Typography>
                                <div>
                                    <Badge color="primary" badgeContent={shopCartCount}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                </div>

                            </Toolbar>
                        </nav>
                        <CardItem count={2} product={'aca va el product'} />
                    </div>
                </Drawer>
            //</Hidden>
        );
    }
}

const minWidth = '150px'
const drawerWidth = "20%";

const minWidthMobile = '150px'
const drawerWidthMobile = "100%";
const styles = theme => ({
    cartToolBar:{
        backgroundColor: theme.palette.secondary.main,
    },
    drawer: {
        minWidth: minWidth,
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            minWidth: minWidthMobile,
            width: drawerWidthMobile,
        },
    },
    drawerPaper: {
        minWidth: minWidth,
        width: drawerWidth,
        [theme.breakpoints.down("sm")]: {
            marginTop: '3%',
            minWidth: minWidthMobile,
            width: drawerWidthMobile,
        },
    },
    drawerContainer: {
        overflow: 'auto',
    },

});

export default withStyles(styles)(ShopDrawer);