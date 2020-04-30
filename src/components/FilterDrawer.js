import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";


class FilterDrawer extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { classes, categoryList,  categoryName, onFilterClick }  = this.props;
        return (
            <Hidden only={['sm', 'xs']}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <Divider />
                        <List>
                            {categoryList.map(category => (
                                <ListItem button
                                          key={category}
                                          name={categoryName}
                                          onClick={onFilterClick(category)}>
                                    <ListItemText primary={category} />
                                </ListItem>
                            ))}
                        </List>
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

export default withStyles(styles)(FilterDrawer);