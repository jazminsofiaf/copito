import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.state.mainImage = (props.product.image)
    }

    openDialog = () => {
        this.setState({show: true})
    }


    render() {
        const { classes, product } = this.props;
        return (
            <div>
                <Card className={classes.card} onClick={this.openDialog}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={this.state.mainImage}
                            title="Producto"
                            height="300"
                        />
                        <CardContent>
                            <Typography >
                                {product.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

const styles = theme => ({
    card: {
        maxWidth: 300,
        margin: 20,
        width: 300,
    },
    media: {
        objectFit: 'cover',
    },
});

export default withStyles(styles)(ProductCard);