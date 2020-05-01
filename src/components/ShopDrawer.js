import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";


class ShopDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
        }  = this.props;
        return (
            <Hidden only={['sm', 'xs']}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="right">
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <Divider />
                    </div>
                </Drawer>
            </Hidden>
        );
    }
}

const minWidth = '150px'
const drawerWidth = "20%";
const styles = theme => ({
    drawer: {
        minWidth: minWidth,
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        minWidth: minWidth,
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },

});

export default withStyles(styles)(ShopDrawer);