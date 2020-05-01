
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
class SearchFilter extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const { classes, onTextChange, search, stateKey } = this.props;
        return (
            <div>
                <Box display="flex" flexDirection="row" p={1} m={1} >
                    <Box p={1} bgcolor="grey.300" style={{borderRadius: '10px 0px 0px 10px'}} >
                        <SearchIcon />
                    </Box>
                    <Box p={0} bgcolor="grey.300" style={{borderRadius: '0px 10px 10px 0px'}} >
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
        [theme.breakpoints.up('sm')]: {
            '&:focus': {

            },
        },
    },
});

export default withStyles(styles)(SearchFilter);