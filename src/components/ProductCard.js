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
import PlusOneIcon from '@material-ui/icons/PlusOne';
import {Divider} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

class ProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            openAlert: false,
        };
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

    handleAddToCartClick(isLogged, productId){
        if(isLogged){
          return this.props.onAddToCart(productId);
        }else{
            return this.newAlert()
        }

    }

    newAlert(){
        this.setState({
            openAlert: true,
        });

    };

    handleCloseAlert(){
        this.setState({
            openAlert: false,
        });
    };


    render() {
        const { classes, product } = this.props;
        const isLogged =  !(authToken.getToken() === null);
        return (
            <div style={{position:'relative'}}>
                <div className={classes.cartIconContainer}>
                    <Tooltip title="Agregar al carrito"
                             aria-label="add"
                             className={classes.overlap}
                             onClick={() => this.handleAddToCartClick(isLogged, product.id)}>
                        <Fab color="secondary">
                            <PlusOneIcon/>
                        </Fab>
                    </Tooltip>
                    <Snackbar
                        open={this.state.openAlert}
                        onClose={() => this.handleCloseAlert(this)}
                        TransitionComponent={TransitionDown}
                        message="Debe iniciar Sesion para comprar"
                    />
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