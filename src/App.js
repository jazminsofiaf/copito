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
import CssBaseline from "@material-ui/core/CssBaseline";


const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#67c9d6',
        },
        secondary: {
            main: '#67d68a',
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
                                <Route path="/products" component={Products}/>
                                <Route component={Home}/>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

