import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './App.css';
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/products" component={Products} />
                  <Route component={Home} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
