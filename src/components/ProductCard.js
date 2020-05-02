import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import authToken from "../providers/authToken";
import ProductModal from "./ProductModal";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {Box, Divider} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

class ProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false};
        this.state.mainImage = (props.product.image)
    }

    openDialog = () => {
        this.setState({show: true})
    }

    closeDialog(){
        this.setState({ show: false });
    }

    renderModal(product){
        return <ProductModal open={this.state.show} product={product} handleClose={this.closeDialog.bind(this)}/>
    }


    render() {
        const { classes, product, onAddToCart } = this.props;
        const isLogged =  !(authToken.getToken() === null);
        return (
            <div style={{position:'relative'}}>
                <div className={classes.cartIconContainer}>
                    <Tooltip title="Agregar al carrito"
                             aria-label="add"
                             className={classes.overlap}
                             onClick={() =>onAddToCart(product.id)}>
                        <Fab color="secondary">
                            <ShoppingCartIcon/>
                        </Fab>
                    </Tooltip>
                </div>
                <Card className={classes.card} >
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={this.state.mainImage}
                            title="Producto"
                            height="300"
                            onClick={this.openDialog}
                        />
                        <CardContent>
                            <div>
                                {this.renderModal(product)}
                                <Typography gutterBottom variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {product.description}
                                </Typography>
                            </div>
                            <Divider/>
                            {isLogged && (
                                <GridList cellHeight={56} style={{padding:10}}>
                                    <GridListTile >
                                        <GridListTileBar title={product.price + '$'} className={classes.price} />
                                    </GridListTile>
                                    <GridListTile />
                                </GridList>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

const styles = theme => ({
    cartIconContainer: {
        position:'absolute',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    overlap: {
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main,
    },
    card: {
        maxWidth: 300,
        margin: 20,
        width: 300,
    },
    price: {
        backgroundColor: theme.palette.secondary.main,
    },
    media: {
        objectFit: 'cover',
    },

});

export default withStyles(styles)(ProductCard);