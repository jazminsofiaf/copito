
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const defaultProps = {
    bgcolor: 'background.paper',
    border: 1,
    borderColor: 'text.primary',
    style: { width: '5rem', height: '5rem' },
};

class SearchFilter extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { classes, onTextChange, search, stateKey } = this.props;
        return (
            <div>
                <Box pt={1} mt={1} pl={1} ml={1} >
                    <Typography variant="h6"  align="left"  className={classes.mainTitle}>
                        Buscar Producto
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" m={1}  >
                    <Box p={1} bgcolor="white" {...defaultProps} borderRight={0} style={{borderRadius: '10px 0px 0px 10px'}} >
                        <SearchIcon />
                    </Box>
                    <Box p={0} bgcolor="white" {...defaultProps} borderLeft={0} style={{borderRadius: '0px 10px 10px 0px'}} flexGrow={1}>
                        <InputBase
                            placeholder="Buscar..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name={search}
                            onChange={onTextChange(stateKey)}
                        />
                    </Box>
                </Box>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        width: '100%',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        height: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        //transition: theme.transitions.create('width'),
        width: '100%',
        height: '100%',

    },

});

export default withStyles(styles)(SearchFilter);