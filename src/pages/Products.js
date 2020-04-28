import React from 'react';
import ProductCard from '../components/ProductCard';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";


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
            );
    }


}
const styles = theme => ({
    products: {
        display: 'flex',
        flexFlow: 'row wrap',
        marginTop: '0px',
    },
});


export default withStyles(styles)(ProductList);
