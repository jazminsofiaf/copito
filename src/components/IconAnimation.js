import React from 'react';
import logo from './logo.svg';
import './IconAnimation.css';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Florida Productos Veterinarios</h1>
                </header>
            </div>
        );
    }
}

export default Home;
