import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import UpperBar from "../components/UpperBar";
import DynamicDrawer from "../components/DynamicDrawer";
import withStyles from "@material-ui/core/styles/withStyles";
import FilterBar from "../components/FilterBar";
import Box from "@material-ui/core/Box";
import ProductCard from "../components/ProductCard";
import {clone} from "@babel/types";



class Prueba extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
            cart: {},
            search: '',
            categories: ["Todos","Medicamentos", "Alimentos", "juguetes"],
            category: 'Todos',
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

    handleOnFilterClick = name => event => {
        console.log(event.target);
        this.setState(
            {category: name}
        )
    };
    handleTextChange= name => event => {
        console.log(event.target.value);
        this.setState({ [name] : event.target.value });
    };

    handleAddToCart = productId => {
        console.log("add to card");
        console.log(productId);
        //const productSelected = this.state.products.filter(prod => prod.id === productId);
        const count = this.state.cart[productId];
        const newShopCart = this.state.cart;
        if(count !== undefined){
            newShopCart[productId] = count + 1;
        }else{
            newShopCart[productId] = 1;
        }

        this.setState({ cart : newShopCart});
        console.log(this.state.cart);



    }



    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <div>
                    <Toolbar />
                    <DynamicDrawer products={this.state.products} cart={this.state.cart}>
                        <div>
                            <FilterBar
                                categoryList={this.state.categories}
                                categoryName={this.state.category}
                                onFilterClick={this.handleOnFilterClick.bind(this)}
                                stateKey="search"
                                search={this.state.search}
                                onTextChange={this.handleTextChange.bind(this)}
                            />
                            <Box display="flex" flexDirection="row-reverse" className={classes.products}>
                                {this.state.products.map((product, i) =>{
                                    if((this.state.category === 'Todos' || product.id %2 === 0)
                                        &&
                                        (product.name.toLowerCase().includes(this.state.search.toLowerCase())))
                                        return(
                                            <div key={i}>
                                                <ProductCard product={product}
                                                             onAddToCart={this.handleAddToCart.bind(this)}
                                                />
                                            </div>
                                        )
                                })}
                            </Box>
                        </div>
                    </DynamicDrawer>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    products: {
        display: 'flex',
        flexFlow: 'row-reverse wrap',
        marginTop: '0px',
    },
    root: {
        display: 'flex',
    },
});


export default withStyles(styles)(Prueba);
