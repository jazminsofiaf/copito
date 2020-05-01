import React from 'react';
import ProductCard from '../components/ProductCard';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import UpperBar from "../components/UpperBar";
import FilterBar from "../components/FilterBar";
import ShopDrawer from "../components/ShopDrawer";
import Box from "@material-ui/core/Box";



class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products: [],
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



    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <main className={classes.content}>
                    <Toolbar />
                    <div>
                        <FilterBar
                            categoryList={this.state.categories}
                            categoryName={this.state.category}
                            onFilterClick={this.handleOnFilterClick.bind(this)}
                            stateKey="search"
                            search={this.state.search}
                            onTextChange={this.handleTextChange.bind(this)}
                        />
                        <Box display="flex" flexDirection="row-reverse" p={1} m={1} className={classes.products}>
                                {this.state.products.map((product, i) =>{
                                    if((this.state.category === 'Todos' || product.id %2 === 0)
                                        &&
                                        (product.name.toLowerCase().includes(this.state.search.toLowerCase())))
                                        return(
                                            <div key={i}>
                                                <ProductCard product={product}/>
                                            </div>
                                        )
                                })}
                        </Box>
                    </div>
                </main>
                <ShopDrawer/>
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});


export default withStyles(styles)(ProductList);
