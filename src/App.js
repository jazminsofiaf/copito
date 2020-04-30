import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingInSide from "./pages/SingInSide";
import CssBaseline from "@material-ui/core/CssBaseline";
import withAdmin from "./providers/withAdmin";


const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#BC4639',
        },
        secondary: {
            main: '#5C2018',
        },
    },
    typography: { useNextVariants: true },
});

export default class App extends Component {


    componentDidMount() {
        document.title = "Florida productos veterinarios"
    }


    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}><CssBaseline/>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={SingInSide}/>
                                <Route path="/products" component={withAdmin(Products)}/>
                                <Route component={Home}/>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

