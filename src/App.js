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
import SingUp from "./pages/SingUp";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import EditClients from "./pages/Backoffice/EditClients";
import EditProducts from "./pages/Backoffice/EditProducts";
import EditProviders from "./pages/Backoffice/EditProviders";
import IconAnimation from "./components/IconAnimation"
import CssBaseline from "@material-ui/core/CssBaseline";
import withAdmin from "./providers/withAdmin";


const theme = createMuiTheme({
    palette: {
        type: 'light',
        background: {
            default: '#FFFAF0',
        },
        primary: {
            main:  '#f2513f',
        },
        secondary: {
            main: '#25a1ba',
        },
    },
    spacing: 8,
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
                                <Route exact path="/" component={IconAnimation}/>
                                <Route exact path="/faq" component={Faq}/>
                                <Route exact path="/home" component={Home}/>
                                <Route exact path="/login" component={SingInSide}/>
                                <Route exact path="/singUp" component={SingUp}/>
                                <Route exact path="/products" component={Products}/>
                                <Route exact path="/contactUs" component={ContactUs}/>
                                <Route exact path="/backoffice/clients" component={withAdmin(EditClients)}/>
                                <Route exact path="/backoffice/products" component={withAdmin(EditProducts)}/>
                                <Route exact path="/backoffice/providers" component={withAdmin(EditProviders)}/>
                                <Route component={Home}/>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

