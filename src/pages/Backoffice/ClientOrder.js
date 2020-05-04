import React from "react";
import UpperBar from "../../components/UpperBar";
import withStyles from "@material-ui/core/styles/withStyles";
import config from "../../config/config";
import Toolbar from "@material-ui/core/Toolbar";
import {Box, Divider} from "@material-ui/core";
import OptionsSelector from "../../components/OptionsSelector";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ShopProducts from "../../components/ShopProducts";

const server_url = config.server_url;


class ClientOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            selectedClient: undefined,
        }
    }

    getClients() {
        fetch('https://my-json-server.typicode.com/jazminsofiaf/fake-client-endpoint/db', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.clients);
                this.setState({
                    clients : data.clients,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    componentDidMount(){
        this.getClients();
    }

    handleClientSelected = (event, value) => {
        const client = value[0];

        this.setState({
            selectedClient: client,
        })
        console.log(this.state.selectedClient)

    }


    render() {
        const { classes } = this.props;

        const inputFilterFunc = (option) => (option.name +' '+option.lastName + ' ' +option.businessName);
        const renderClientOption = (client) => (
            <React.Fragment>
                <ListItemText primary={client.name + ' '+ client.lastName} secondary={client.businessName}/>
            </React.Fragment>
        )
        return(
            <div className={classes.root}>
                <UpperBar/>
                <Box className={classes.screenSize}>
                    <Toolbar />
                    <Box className={classes.container}>
                        <OptionsSelector options={this.state.clients}
                                         filterFunc={inputFilterFunc}
                                         label={"Cliente"}
                                         handleOptionSelected={this.handleClientSelected.bind(this)}
                                         renderOption={renderClientOption}
                        ></OptionsSelector>
                        {(this.state.selectedClient !== undefined) && (
                            <Box m={3}>
                            <Paper elevation={3}>
                            <ListItem alignItems='center' >
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={this.state.selectedClient.name + ' '+ this.state.selectedClient.lastName}
                                    secondary={
                                        <React.Fragment>
                                            {this.state.selectedClient.businessName}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            </Paper>
                            </Box>
                        )}
                    </Box>
                    <ShopProducts/>
                </Box>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    mainTitle:{
        marginTop: '300px',
    },
    screenSize: {
        width: '100vw',
        height:'100vh',
    },
    container: {
        width:'60%',
        margin: '5%',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            width: '90%',
        }
    },
});


export default withStyles(styles)(ClientOrder);
