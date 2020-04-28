import React from 'react';
import ProductCard from '../components/ProductCard';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";


class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
        }
    }

    getProducts() {
        fetch('https://my-json-server.typicode.com/jazminsofiaf/fake_endpoint/db', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.products);
                this.setState({
                    products : data.products,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    componentDidMount(){
        this.getProducts();
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <Divider />
                        <List>
                            {['Medicamentos', 'Jueguetes', 'Comida'].map(category => (
                                <ListItem button key={category}>
                                    <ListItemText primary={category} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <Toolbar />
                    <div>
                        <h1>Shop</h1>
                        <div className={classes.products}>
                            <Grid container spacing={3}>
                                {this.state.products.map((product, i) =>{
                                    return(
                                        <div key={i}>
                                            <ProductCard product={product}/>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </div>
                    </div>
                </main>
            </div>
            );
    }
}

const drawerWidth = "20%";
const styles = theme => ({
    products: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginTop: '0px',
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});


export default withStyles(styles)(ProductList);
