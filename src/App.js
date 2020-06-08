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
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import Presentation from "./pages/Presentation";
import Faq from "./pages/Faq";
import Clients from "./pages/Backoffice/Clients";
import AdminProducts from "./pages/Backoffice/AdminProducts";
import Providers from "./pages/Backoffice/Providers";
import ClientOrder from "./pages/Backoffice/ClientOrder";
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
            dark: '#c74436',//'#5c2018',
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
                                <Route exact path="/" component={Presentation}/>
                                <Route exact path="/faq" component={Faq}/>
                                <Route exact path="/home" component={Home}/>
                                <Route exact path="/login" component={SignIn}/>
                                <Route exact path="/sign-up" component={SignUp}/>
                                <Route exact path="/products" component={Products}/>
                                <Route exact path="/contact-us" component={ContactUs}/>
                                <Route exact path="/backoffice/clients" component={withAdmin(Clients)}/>
                                <Route exact path="/backoffice/products" component={withAdmin(AdminProducts)}/>
                                <Route exact path="/backoffice/providers" component={withAdmin(Providers)}/>
                                <Route exact path="/backoffice/client-order" component={withAdmin(ClientOrder)}/>
                                <Route component={Home}/>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

