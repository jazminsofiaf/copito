import React from 'react';
import logo from './logo.svg';
import './Home.css';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Welcome to Florida App</h1>
            </header>
        </div>
    );
}

export default Home;
